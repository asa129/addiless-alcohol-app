import "dotenv/config";
import { anthropic } from "./anthropic";
import collectData from "./collectData";
import {
  insertAlcoholData,
  insertAlcoholDetails,
} from "../src/utils/supabaseFunctions";

(async () => {
  // 情報を収集、取得
  const getDetailInfoList = await collectData();
  // 取得した詳細情報を元におすすめの飲み方、カクテルレシピ、ペアリングを聞く
  const content = `あなたは、お酒に関する情報に関して詳しいです。\n
  以下に示したデータを元に、おすすめの飲み方、カクテルレシピ、ペアリングを教えてください。\n
  ${JSON.stringify(getDetailInfoList)}\n
  getDetailInfoList分それぞれ出力してください。
  各項目は以下のイメージでJSON形式で出力してください。
  {
  drinking_methods:おすすめの飲み方
  cocktail_recipes:カクテルレシピ
  recommended_snacks:ペアリング
  }\n
  各項目につき1つで大丈夫です。絵文字を使用してもいいです。`;
  const msg = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    messages: [{ role: "user", content: content }],
  });
  // insert処理;
  const insertData = await insertAlcoholData(getDetailInfoList);

  if (msg.content[0] && "text" in msg.content[0]) {
    const messageData = msg.content[0].text;

    // ```json と ``` で囲まれたJSONブロックを抽出
    const jsonMatches = messageData.match(/```json\n([\s\S]*?)\n```/g) || [];
    for (let i = 0; i < getDetailInfoList.length; i++) {
      let alcohol_details = {
        id: "",
        drinking_methods: "",
        cocktail_recipes: "",
        recommended_snacks: "",
      };

      if (jsonMatches[i]) {
        try {
          // ```json と ``` を除去してJSONだけ取得
          const jsonText = jsonMatches[i].replace(/```json\n|\n```/g, "");
          const parsedData = JSON.parse(jsonText);

          alcohol_details = {
            id: insertData[i].id,
            drinking_methods: parsedData.drinking_methods || "",
            cocktail_recipes: parsedData.cocktail_recipes || "",
            recommended_snacks: parsedData.recommended_snacks || "",
          };

          console.log(`アルコール ${i + 1} の詳細:`, alcohol_details);
        } catch (error) {
          console.error(`JSON解析エラー (${i}):`, error);
          console.log("問題のあるJSON:", jsonMatches[i]);
        }
        await insertAlcoholDetails(alcohol_details);
      }
    }
  }
})();

import { anthropic } from "./anthropic";
import collectData from "./collectData";

(async () => {
  // 情報を収集、取得
  const getDetailInfoList = await collectData();
  // 取得した詳細情報を元におすすめの飲み方、カクテルレシピ、ペアリングを聞く
  const content = `あなたは、お酒に関する情報に関して詳しいです。\n
  以下に示したデータを元に、おすすめの飲み方、カクテルレシピ、ペアリングを教えてください。\n
  ${JSON.stringify(getDetailInfoList)}\n
  各項目は以下の形式で出力してください。
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
  console.log("content", content);
  console.log("getDetailInfoList", getDetailInfoList);
  console.log(msg);
})();

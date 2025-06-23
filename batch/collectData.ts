import puppeteer from "puppeteer";
import type { Alcohols } from "../src/domain/Alcohols.ts";

async function collectData() {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: false, // ブラウザを表示して動作確認
    devtools: false, // 開発者ツールを開く
  });
  const page = await browser.newPage();

  // Navigate the page to a URL
  // https://products.suntory.co.jp/rtd/ingredient.html
  await page.goto("https://products.suntory.co.jp/beer/ingredient.html", {
    waitUntil: "networkidle2",
  });

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  // 年齢確認フォームが表示されるのを待つ
  await page.waitForSelector(".age-gate-form, form", { timeout: 10000 });

  // 年月日を選択（実際のセレクタは開発者ツールで確認）
  try {
    // 年を選択
    await page.click(".age_check_dateyear");
    await page.type(".age_check_dateyear", "1990");

    // 月を選択
    await page.click(".age_check_datemonth");
    await page.type(".age_check_datemonth", "1");

    // 日を選択
    await page.click(".age_check_dateday");
    await page.type(".age_check_dateday", "1");

    // 「サイトに入る」ボタンをクリック
    await page.click(".age_check_ok");
  } catch (error) {
    console.error("年齢確認の処理でエラー:", error);
  }

  // テーブルが読み込まれるまで待つ
  await page.waitForSelector("table", { timeout: 10000 });

  console.log("テーブルを発見しました");
  // テーブルの行を取得

  const getDetailInfoList = await page.evaluate(() => {
    const detailInfoList: Partial<Alcohols>[] = [];
    const rows = document.querySelectorAll("table tr");

    for (let i = 1; i < rows.length; i++) {
      if (i > 2) continue; // 取得する行数を制限（例: 最初の5行のみ）
      // 詳細ページで要素を取得
      const ingrediens =
        document.querySelector(`table tr:nth-child(${i}) td:nth-child(3)`)
          ?.textContent || "";
      const detailInfo: Partial<Alcohols> = {
        sake_name:
          document.querySelector(`table tr:nth-child(${i}) .product_name`)
            ?.textContent || "",
        genre_id: 1,
        manufacturer_id: 1,
        image_url:
          document
            .querySelector(`table tr:nth-child(${i}) img`)
            ?.getAttribute("src") || null,
        ingredients_text: ingrediens.split("／")[0].trim(),
        has_additives: ingrediens.includes("／") ? true : false,
        is_active: true,
        additives_text: ingrediens.includes("／")
          ? ingrediens.split("／")[1].trim()
          : "",
        alcohol_percentage: Number(
          document
            .querySelector(`table tr:nth-child(${i}) td:nth-child(4)`)
            ?.textContent?.match(/[\d.]+/)?.[0] || ""
        ),
        calories: Number(
          document
            .querySelector(`table tr:nth-child(${i}) td:nth-child(6)`)
            ?.textContent?.match(/[\d.]+/)?.[0] || ""
        ),
        carbohydrates:
          document
            .querySelector(`table tr:nth-child(${i}) td:nth-child(10)`)
            ?.textContent?.match(/[\d.]+/)?.[0] || "",
      };
      detailInfoList.push(detailInfo);
    }
    return detailInfoList;
  });
  console.log("詳細情報を取得しました");

  // ブラウザを閉じる
  await browser.close();
  return getDetailInfoList;
}

export default collectData;

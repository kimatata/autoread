const puppeteer = require('puppeteer-extra')
const dotenv = require("dotenv");
dotenv.config();

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const bookPages = require('./bookPages');

main();

async function main() {
  const browser = await puppeteer.launch({ headless: "new" });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 1400 });
  await page.goto("https://login.comptia.org/"); // ログイン画面に移動
  await page.waitForSelector("input#signInName"); // ログイン情報入力タグが表示されるまで待機

  // ログイン情報入力
  console.log("main: moved to login page.");
  await page.waitForTimeout(5000)
  await page.type("input#signInName", process.env.EMAIL);
  await page.type("input#password", process.env.PASSWORD);
  await page.waitForTimeout(3000);
  await page.click("button#next");
  await page.waitForTimeout(1000);
  await page.click("button#next");
  await page.waitForTimeout(5000);

  // ログイン後画面スクリーンショット撮影
  console.log("main: logged in.");
  await page.screenshot({ path: ".output/after_login.png" });

  // テキストに移動
  await page.goto("https://officialcomptiastudyguides.webreader.io/#!/library");
  await page.waitForTimeout(5000);
  await page.screenshot({ path: ".output/need_login.png" });
  console.log("main: need login again");

  // 再度ログインボタンを押す
  await page.waitForSelector('button.button');
  await page.click('button.button');
  await page.waitForTimeout(5000);
  await page.screenshot({ path: ".output/after_click_login_button.png" });

  // ライブラリに移動するのを待つ
  await page.waitForSelector('.book-tile-grid');
  await page.screenshot({ path: ".output/library.png" });
  console.log("main: moved to library");

  // ページ遷移
  const start = 1
  const end = 60
  let i
  let targetUrl = ""
  const slicedBookPages = bookPages.slice(start, end + 1);

  // クリップ
  const selector = '.reader-wrapper';
  let element
  let boundingBox

  for (i = 0; i < slicedBookPages.length; i++) {
    targetUrl = "https://officialcomptiastudyguides.webreader.io/#!/reader/6a2c26c3-b5f6-4fdf-bb0f-f2c31319e8f5/page/" + slicedBookPages[i].path
    await page.goto(targetUrl);
    console.log("moveto to page:" + (i + start) + " url:" + targetUrl)
    await page.waitForTimeout(6000);

    // サイドバーを除く範囲のスクリーンショットを取得
    await page.waitForSelector(selector);
    element = await page.$(selector);
    boundingBox = await element.boundingBox();
    await page.screenshot({ path: "book/" + (i + start) + ".png", clip: boundingBox  });
  }

  await browser.close();
}

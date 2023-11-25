const puppeteer = require('puppeteer-extra')
const dotenv = require("dotenv");
dotenv.config();

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

main();

async function main() {
  const browser = await puppeteer.launch({ headless: "new" });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1200 });
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

  // ブックにの1ページ目に移動
  await page.goto("https://officialcomptiastudyguides.webreader.io/#!/reader/6a2c26c3-b5f6-4fdf-bb0f-f2c31319e8f5/page/page-8c4310d62412dce9a34035480a697194");
  await page.waitForTimeout(6000);
  await page.screenshot({ path: ".output/book.png" });
  console.log("main: moved to book");

  // サイドバーを除く部分のスクリーンショットを取得
  let selector = '.reader-wrapper';
  await page.waitForSelector(selector);
  const element = await page.$(selector);
  const boundingBox = await element.boundingBox();
  await page.screenshot({ path: '.output/first_page.png', clip: boundingBox });
  console.log("main: clip first page");

  // 次のページに移動
  await page.screenshot({ path: '.output/second_page0.png' });
  await page.waitForTimeout(6000);

  await page.focus('#go-to-page-input');
  await page.evaluate(() => {
    document.querySelector('#go-to-page-input').value = '10';
  });
  const valueAfterTyping = await page.$eval('#go-to-page-input', (input) => input.value);
  console.log('Value after typing:', valueAfterTyping);
  await page.screenshot({ path: '.output/second_page1.png' });
  await page.waitForTimeout(6000);
  await page.screenshot({ path: '.output/second_page2.png' });

  // await page.focus('#go-to-page-input');
  await page.keyboard.press('Enter');
  await page.screenshot({ path: '.output/second_page3.png' });
  await page.waitForTimeout(6000);

  await page.screenshot({ path: '.output/second_page4.png' });
  console.log("main: clip second page");

  // selector = '#next-page'
  // await page.waitForSelector(selector);

  // await page.click(selector);
  // await page.waitForTimeout(6000);
  // await page.screenshot({ path: '.output/second_page.png', clip: boundingBox });
  // console.log("main: clip second page");

  await browser.close();
}

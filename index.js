const puppeteer = require('puppeteer-extra')
const dotenv = require("dotenv");

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

dotenv.config();

main();

async function main() {
  const browser = await puppeteer.launch({ headless: "new" });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1200 });
  await page.goto("https://login.comptia.org/"); // ログイン画面に移動
  await page.waitForSelector("input#signInName"); // ログイン情報入力タグが表示されるまで待機

  // ログイン情報入力
  await page.waitForTimeout(5000)
  await page.type("input#signInName", process.env.EMAIL);
  await page.type("input#password", process.env.PASSWORD);
  await page.waitForTimeout(3000);
  await page.click("button#next");
  await page.waitForTimeout(1000);
  await page.click("button#next");
  await page.waitForTimeout(5000);

  await page.screenshot({ path: ".output/after_login.png" });
  console.log("Login!!");

  // テキストに移動
  await page.goto("https://officialcomptiastudyguides.webreader.io/#!/library");
  // await page.goto("https://officialcomptiastudyguides.webreader.io/#!/reader/6a2c26c3-b5f6-4fdf-bb0f-f2c31319e8f5/page/page-8c4310d62412dce9a34035480a697194");
  await page.waitForTimeout(5000);
  await page.screenshot({ path: ".output/after_library.png" });
  console.log("library!!");

  await browser.close();
}

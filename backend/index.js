// express
const express = require("express");
const app = express();
const port = 3001;

// puppeteer
const puppeteer = require("puppeteer");

// app.get("/", async (req, res) => {
//   // frontendからのリクエストはoriginが異なるので許可設定が必要
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

//   const parsedDom = await fetchFromUrl("https://github.com/jsdom/jsdom");
//   console.log(parsedDom);
//   res.status(201).json(parsedDom.window.document);
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

main();

async function main() {
  const targetUrl = "https://nullnull.dev/blog/web-scraping-in-node-js/";

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(targetUrl);

  // <h>count
  const ret = await page.$$eval("h1, h2, h3, h4, h5, h6", (elements) => {
    return elements.map(e => e.innerText);
  });

  console.log(ret);
  await browser.close();
}
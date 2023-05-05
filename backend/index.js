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
  const anyUrl = "https://nullnull.dev/blog/web-scraping-in-node-js/";

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(anyUrl);
  // const html = await page.content();
  // console.log(html);

  // ページのDOMを取得する
  const document = await page.evaluate(() => {
    return document;
  });
  const rootNode = document.documentElement;
  const domTree = nodeToObject(rootNode)
  // const domTree = await page.evaluate(getDOMTree());
  console.log(domTree);

  await browser.close();
}

function nodeToObject(rootNode) {
  const object = {};
  object.tagName = rootNode.tagName;
  object.children = [];
  for (let i = 0; i < rootNode.children.length; i++) {
    const child = rootNode.children[i];
    object.children.push(nodeToObject(child));
  }
  return object;
}
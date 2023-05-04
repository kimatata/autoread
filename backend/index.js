// express
const express = require("express");
const app = express();
const port = 3001;

// puppeteer
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

app.get("/", async (req, res) => {
  // frontendからのリクエストはoriginが異なるので許可設定が必要
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  const parsedDom = await fetchFromUrl("https://github.com/jsdom/jsdom");
  console.log(parsedDom);
  res.status(201).json(parsedDom.window.document);
});

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

main();

async function main() {
  const anyUrl = "https://nullnull.dev/blog/web-scraping-in-node-js/";
  const dom = await fetchFromUrl(anyUrl);
  const document = dom.window.document;
  console.log({
    text: document.getElementsByTagName("h1").item(0)?.textContent,
  });
}

async function fetchFromUrl(url) {
  const dom = await JSDOM.fromURL(url);
  return dom;
}

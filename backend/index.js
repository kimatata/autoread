const express = require("express");
const app = express();
const port = 3001;

app.get("/", (req, res) => {
  // frontendからのリクエストはoriginが異なるので許可設定が必要
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.status(201).json({ user: 'tobi' })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
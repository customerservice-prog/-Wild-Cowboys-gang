const http = require("http");
const handler = require("serve-handler");
const port = Number(process.env.PORT) || 8080;

http
  .createServer((req, res) => handler(req, res, { public: ".", cleanUrls: false }))
  .listen(port, "0.0.0.0", () => console.log(`Listening on ${port}`));

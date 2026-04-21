const http = require("http");
const handler = require("serve-handler");

const port = Number(process.env.PORT) || 8080;

http
  .createServer((req, res) =>
    handler(req, res, {
      public: __dirname,
      cleanUrls: true,
      directoryListing: false,
      unlisted: [
        "node_modules",
        ".git",
        "package.json",
        "package-lock.json",
        "server.js",
        "Dockerfile",
        ".dockerignore",
        "railway.toml"
      ]
    })
  )
  .listen(port, "0.0.0.0", () => console.log(`Listening on ${port}`));

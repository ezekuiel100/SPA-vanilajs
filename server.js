const http = require("http");
const path = require("path");
const fs = require("fs");

const publicDirectory = path.join(__dirname, "./");

http
  .createServer((req, res) => {
    let filePath = path.join(
      publicDirectory,
      req.url === "/" ? "index.html" : req.url
    );

    fs.stat(filePath, (err, stat) => {
      if (err || stat.isDirectory()) {
        filePath = path.join(publicDirectory, "index.html");
      }

      fs.readFile(filePath, "utf-8", (err, content) => {
        if (err) {
          res.writeHead(500);
          res.end("Erro no servidor");
        } else {
          const ext = path.extname(filePath);
          const contentType = ext === ".css" ? "text/css" : "text/html";

          res.writeHead(200, { "Content-Type": contentType });
          res.end(content);
        }
      });
    });
  })
  .listen(3000, () => console.log("running"));

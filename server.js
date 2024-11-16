const http = require("http");
const path = require("path");
const fs = require("fs");

// Mapeamento de tipos MIME para diferentes extensões
const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".eot": "application/vnd.ms-fontobject",
  ".otf": "font/otf",
};

http
  .createServer((req, res) => {
    let filePath = path.join(
      __dirname,
      req.url === "/" ? "index.html" : req.url
    );

    fs.stat(filePath, (err, stat) => {
      if (err) {
        filePath = path.join(__dirname, "index.html");
      }

      fs.readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(500);
          res.end("Erro no servidor");
        } else {
          const extname = path.extname(filePath);
          const contentType = mimeTypes[extname] || "application/octet-stream";

          res.writeHead(200, { "Content-Type": contentType });
          res.end(content);
        }
      });
    });
  })
  .listen(3000, () => console.log("Servidor rodando na porta 3000"));

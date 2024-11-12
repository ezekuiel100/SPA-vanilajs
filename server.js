const http = require("http");
const path = require("path");
const fs = require("fs");

const publicDirectory = path.join(__dirname, "./");

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
      publicDirectory,
      req.url === "/" ? "index.html" : req.url
    );

    // Verificando se o arquivo solicitado existe ou é um diretório
    fs.stat(filePath, (err, stat) => {
      if (err || stat.isDirectory()) {
        filePath = path.join(publicDirectory, "index.html"); // Se for diretório ou erro, serve o index.html
      }

      // Lê o arquivo solicitado
      fs.readFile(filePath, "utf-8", (err, content) => {
        if (err) {
          res.writeHead(500);
          res.end("Erro no servidor");
        } else {
          // Pega a extensão do arquivo e define o tipo de conteúdo
          const extname = path.extname(filePath);
          const contentType = mimeTypes[extname] || "application/octet-stream"; // Default para arquivo binário

          res.writeHead(200, { "Content-Type": contentType });
          res.end(content);
        }
      });
    });
  })
  .listen(3000, () => console.log("Servidor rodando na porta 3000"));

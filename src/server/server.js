const http = require('http');
const { URL } = require('url');

const startServer = (PORT, handler) => {
  const server = http.createServer((req, res) => {
    console.log(req.method, req.url);
    req.url = new URL(req.url, 'http://' + req.headers.host);
    handler(req, res);
  });

  server.listen(PORT, () => {
    console.log(`Started listening on ${server.address().port}`);
  });
};

module.exports = { startServer };

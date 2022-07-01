const { createServer } = require('http');

const startServer = (PORT, handler) => {
  const server = createServer((req, res) => {
    console.log(req.method, req.url);
    const base = 'http://' + req.headers.host;
    req.url = new URL(req.url, base);
    handler(req, res);
  });

  server.listen(PORT, () => {
    console.log(`Started listening on ${server.address().port}`);
  });
};

module.exports = { startServer };

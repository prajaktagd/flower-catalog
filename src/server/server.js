const { createServer } = require('http');
const fs = require('fs');

const log = (...contents) => fs.appendFile('log.txt', [new Date().toTimeString().split(' ')[0], ...contents, '\n'].join(' '), () => { });

const startServer = (PORT, handler) => {
  const onRequest = (req, res) => {
    const startTime = new Date();
    log(req.method, req.url, 'started');
    const base = 'http://' + req.headers.host;
    req.url = new URL(req.url, base);
    const realEnd = res.end.bind(res);
    res.end = (...args) => {
      const endTime = new Date();
      const timeTaken = endTime.getTime() - startTime.getTime();
      log(req.method, req.url.pathname, 'ended', res.statusCode, timeTaken);
      realEnd(...args);
    }
    if (Math.random() < .1) setTimeout(() => handler(req, res), 5000);
    else handler(req, res);
  }
  const server = createServer(onRequest);

  server.listen(PORT, () => {
    console.log(`Started listening on ${server.address().port}`);
  });
};

module.exports = { startServer };

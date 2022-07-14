const fs = require('fs');

const log = (...contents) => {
  const time = new Date().toTimeString().split(' ')[0];
  const content = [time, ...contents, '\n'].join(' ');
  fs.appendFile('log.txt', content, () => { });
}

const logHandler = (req, res, next) => {
  const startTime = new Date();
  log(req.method, req.url, 'started');

  const realEnd = res.end.bind(res);
  res.end = (...args) => {
    const endTime = new Date();
    const timeTaken = endTime.getTime() - startTime.getTime();
    log(req.method, req.url.pathname, 'ended', res.statusCode, timeTaken);
    realEnd(...args);
  }
  next();
}

module.exports = { logHandler };

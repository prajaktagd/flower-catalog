const fs = require('fs');
const mime = require('mime-types');

const determineContentType = (fileName) => {
  return mime.lookup(fileName) || 'text/plain';
};

const serveStaticFrom = (root, aliases) => {
  return ({ url }, res, next) => {
    const pathname = aliases[url.pathname] || url.pathname;
    const fileName = root + pathname;

    fs.readFile(fileName, (err, data) => {
      if (err) {
        next();
        return;
      }
      res.setHeader('content-type', determineContentType(fileName));
      res.end(data);
    });
  };
};

module.exports = { serveStaticFrom };

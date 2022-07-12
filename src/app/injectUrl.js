const injectUrl = (req, res, next) => {
  const base = 'http://' + req.headers.host;
  req.url = new URL(req.url, base);
  next();
}

module.exports = { injectUrl };

const wrapMethodNotFound = (handlers) => (req, res) => {
  if (!handlers[req.method]) {
    res.statusCode = 405;
    res.setHeader('content-type', 'text/plain');
    res.end(`${req.method} method not allowed`);
    return true;
  }
  const actualHandler = handlers[req.method];
  return actualHandler(req, res);
};

module.exports = { wrapMethodNotFound };

const methodNotSupportedHandler = (req, res, router) => {
  const { method } = req;
  if (method !== 'GET') {
    res.statusCode = 405;
    res.setHeader('content-type', 'text/plain');
    res.end(`${method} method not allowed`);
    return;
  }
  router(req, res);
};

module.exports = { methodNotSupportedHandler };

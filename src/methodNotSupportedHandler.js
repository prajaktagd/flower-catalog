const methodNotSupportedHandler = ({ method }, res, next) => {
  if (method !== 'GET') {
    res.statusCode = 405;
    res.setHeader('content-type', 'text/plain');
    res.end(`${method} method not allowed`);
    return;
  }
  next();
};

module.exports = { methodNotSupportedHandler };

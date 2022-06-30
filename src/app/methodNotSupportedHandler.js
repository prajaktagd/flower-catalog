const methodNotSupportedHandler = ({ method }, res) => {
  if (method !== 'GET') {
    res.statusCode = 405;
    res.setHeader('content-type', 'text/plain');
    res.end(`${method} method not allowed`);
    return true;
  }
  return false;
};

module.exports = { methodNotSupportedHandler };

const { methodNotSupportedHandler } = require('./methodNotSupportedHandler');

const wrapMethodNotFound = (handlers) => (req, res) => {
  if (!handlers[req.method]) {
    return methodNotSupportedHandler(req, res);
  }
  const actualHandler = handlers[req.method];
  return actualHandler(req, res);
};

module.exports = { wrapMethodNotFound };

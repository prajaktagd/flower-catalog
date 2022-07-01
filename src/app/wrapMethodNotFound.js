const { methodNotSupportedHandler } = require('./methodNotSupportedHandler');

const wrapMethodNotFound = (handlers) => (req, res, next) => {
  if (!handlers[req.method]) {
    methodNotSupportedHandler(req, res, next);
    return;
  }
  const actualHandler = handlers[req.method];
  actualHandler(req, res, next);
};

module.exports = { wrapMethodNotFound };

const { methodNotSupportedHandler } = require('./methodNotSupportedHandler');

const wrapMethodNotFound = (handlers) => (req, res, router) => {
  if (!handlers[req.method]) {
    methodNotSupportedHandler(req, res, router);
    return;
  }
  const actualHandler = handlers[req.method];
  actualHandler(req, res, router);
};

module.exports = { wrapMethodNotFound };

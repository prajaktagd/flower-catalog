const { wrapMethodNotFound } = require('../app/wrapMethodNotFound.js');

const createRouter = (methodHandlers) => (req, res) => {
  const { pathname } = req.url;
  const handlers = methodHandlers[pathname];
  if (!handlers) {
    return false;
  }
  const wrappedHandler = wrapMethodNotFound(handlers);
  return wrappedHandler(req, res);
};

const createMainRouter = (handlers) => (req, res) => {
  for (const handler of handlers) {
    if (handler(req, res)) {
      return true;
    }
  }
  return false;
};

module.exports = { createMainRouter, createRouter };

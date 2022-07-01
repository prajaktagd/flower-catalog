const { wrapMethodNotFound } = require('../app/wrapMethodNotFound.js');

const createRouter = (methodHandlers) => (req, res, next) => {
  const { pathname } = req.url;
  const handlers = methodHandlers[pathname];
  if (!handlers) {
    next();
    return;
  }

  const wrappedHandler = wrapMethodNotFound(handlers);
  wrappedHandler(req, res, next);
};

const createNextCaller = (handlers) => {
  let index = -1;

  const callNext = (req, res) => {
    index++;
    const currentHandler = handlers[index];
    if (currentHandler) {
      currentHandler(req, res, () => callNext(req, res));
    }
  };

  return callNext;
};

const createInitiator = (handlers) => (req, res) => {
  const callNext = createNextCaller(handlers);
  callNext(req, res);
};

module.exports = { createInitiator, createRouter };

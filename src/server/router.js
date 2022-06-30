const { wrapMethodNotFound } = require('../app/wrapMethodNotFound.js');

const createRouter = (methodHandlers) => (req, res, router) => {
  const { pathname } = req.url;
  const handlers = methodHandlers[pathname];
  if (!handlers) {
    router(req, res);
    return;
  }
  const wrappedHandler = wrapMethodNotFound(handlers);
  wrappedHandler(req, res, router);
};

const createSubRouter = (handlers) => {
  let index = -1;
  const subRouter = (req, res) => {
    index++;
    const currentHandler = handlers[index];
    if (currentHandler) {
      currentHandler(req, res, subRouter);
    }
  };
  return subRouter;
};

const createMainRouter = (handlers) => (req, res) => {
  const subRouter = createSubRouter(handlers);
  subRouter(req, res);
};

module.exports = { createMainRouter, createRouter };

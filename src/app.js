const { createMainRouter, createRouter } = require('./server/router.js');
const { serveStaticFrom } = require('./app/serveStaticFrom.js');
const { notFoundHandler } = require('./app/notFoundHandler.js');
const { createGuestBookLoader } = require('./app/loadGuestBook.js');
const { guestBookPageCreator, commentsAdder } = require('./app/guestBookHandlers.js');
const { guestBookApiHandler, guestBookQueryHandler } = require('./apiHandlers.js');
const { methodNotSupportedHandler } = require('./app/methodNotSupportedHandler.js');

const app = (serveFrom) => {
  const commentsFile = './data/comments.json';
  const templateFile = './resources/guest-book-template.html';

  const guestBookHandlers = {
    '/guest-book': { 'GET': guestBookPageCreator },
    '/guest-book/add-comment': { 'GET': commentsAdder }
  };

  const apiHandlers = {
    '/api/guest-book': { 'GET': guestBookApiHandler },
    '/api/guest-book/q': { 'GET': guestBookQueryHandler },
  };

  const aliases = { '/': '/index.html' };

  const loadGuestBook = createGuestBookLoader(templateFile, commentsFile);
  const guestBookRouter = createRouter(guestBookHandlers);
  const apiRouter = createRouter(apiHandlers);
  const serveStaticHandler = serveStaticFrom(serveFrom, aliases);

  const handlers = [loadGuestBook, guestBookRouter, apiRouter,
    methodNotSupportedHandler, serveStaticHandler, notFoundHandler];
  return createMainRouter(handlers);
};

module.exports = { app };

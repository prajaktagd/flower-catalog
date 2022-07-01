const { fetchBodyParams } = require('./app/fetchBodyParams.js');
const { createInitiator, createRouter } = require('./server/router.js');
const { notFoundHandler } = require('./app/notFoundHandler.js');
const { methodNotSupportedHandler } = require('./app/methodNotSupportedHandler.js');
const { serveStaticFrom } = require('./app/serveStatic.js');
const { createGuestBookLoader } = require('./app/loadGuestBook.js');

const guestBookLib = require('./app/guestBookHandlers.js');
const apiLib = require('./app/apiHandlers.js');
const { guestBookPageCreator, commentsAdder } = guestBookLib;
const { guestBookApiHandler, guestBookQueryHandler } = apiLib;

const app = (serveFrom) => {
  const commentsFile = './data/comments.json';
  const templateFile = './resources/guest-book-template.html';

  const guestBookHandlers = {
    '/guest-book': { 'GET': guestBookPageCreator },
    '/guest-book/add-comment': { 'POST': commentsAdder }
  };

  const apiHandlers = {
    '/api/guest-book': { 'GET': guestBookApiHandler },
    '/api/guest-book/q': { 'GET': guestBookQueryHandler }
  };

  const aliases = { '/': '/index.html' };

  const loadGuestBook = createGuestBookLoader(templateFile, commentsFile);
  const guestBookRouter = createRouter(guestBookHandlers);
  const apiRouter = createRouter(apiHandlers);
  const serveStatic = serveStaticFrom(serveFrom, aliases);

  const handlers = [
    fetchBodyParams,
    loadGuestBook,
    guestBookRouter,
    apiRouter,
    methodNotSupportedHandler,
    serveStatic,
    notFoundHandler
  ];

  return createInitiator(handlers);
};

module.exports = { app };

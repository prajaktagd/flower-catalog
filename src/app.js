const { createRouter, createDynamicHandler } = require('./server/router.js');
const { serveStaticFrom } = require('./app/serveStaticFrom.js');
const { notFoundHandler } = require('./app/notFoundHandler.js');
const { createGuestBookLoader } = require('./app/loadGuestBook.js');
const { guestBookPageCreator, commentsHandler } = require('./app/guestBookHandler.js');

const app = (serveFrom) => {
  const commentsFile = './data/comments.json';
  const templateFile = './resources/guest-book-template.html';

  const methodHandlers = {
    '/guest-book': { 'GET': guestBookPageCreator },
    '/add-comment': { 'GET': commentsHandler }
  };

  const aliases = { '/': '/index.html' };

  const loadGuestBook = createGuestBookLoader(templateFile, commentsFile);
  const dynamicHandler = createDynamicHandler(methodHandlers);
  const serveStaticHandler = serveStaticFrom(serveFrom, aliases);

  const handlers = [loadGuestBook, dynamicHandler, serveStaticHandler,
    notFoundHandler];
  return createRouter(handlers);
};

module.exports = { app };

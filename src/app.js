const { createMainRouter, createRouter } = require('./server/router.js');
const { serveStaticFrom } = require('./app/serveStaticFrom.js');
const { notFoundHandler } = require('./app/notFoundHandler.js');
const { createGuestBookLoader } = require('./app/loadGuestBook.js');
const { guestBookPageCreator, commentsHandler } = require('./app/guestBookHandler.js');
const { wrapMethodNotFound } = require('./app/wrapMethodNotFound.js');

const app = (serveFrom) => {
  const commentsFile = './data/comments.json';
  const templateFile = './resources/guest-book-template.html';

  const methodHandlers = {
    '/guest-book': { 'GET': guestBookPageCreator },
    '/guest-book/add-comment': { 'GET': commentsHandler }
  };

  const aliases = { '/': '/index.html' };

  const loadGuestBook = createGuestBookLoader(templateFile, commentsFile);
  const guestBookRouter = createRouter(methodHandlers);
  const serveStaticHandler = serveStaticFrom(serveFrom, aliases);
  const wrappedStaticServer = wrapMethodNotFound({ 'GET': serveStaticHandler });

  const handlers = [loadGuestBook, guestBookRouter, wrappedStaticServer,
    notFoundHandler];
  return createMainRouter(handlers);
};

module.exports = { app };

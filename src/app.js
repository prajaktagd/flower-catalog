const { createRouter } = require('./server/router.js');
const { createGuestBookDataLoader } = require('./app/loadGuestBookData.js');
const { guestBookHandler } = require('./app/guestBookHandler.js');
const { serveStaticFrom } = require('./app/serveStaticFrom.js');
const { notFoundHandler } = require('./app/notFoundHandler.js');

const app = (serveFrom) => {
  const commentsFile = './data/comments.json';
  const templateFile = './resources/guest-book-template.html';
  const loadGuestBookData = createGuestBookDataLoader(templateFile, commentsFile);

  const handlers = [loadGuestBookData, guestBookHandler, serveStaticFrom(serveFrom),
    notFoundHandler];

  return createRouter(handlers);
};

module.exports = { app };

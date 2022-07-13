const { fetchBodyParams } = require('./app/fetchBodyParams.js');
const { createInitiator, createRouter } = require('./server/router.js');
const { notFoundHandler } = require('./app/notFoundHandler.js');
const { methodNotSupportedHandler } = require('./app/methodNotSupportedHandler.js');
const { serveStaticFrom } = require('./app/serveStatic.js');
const { injectCookies } = require('./app/injectCookies.js');
const { injectSession } = require('./app/injectSession.js');
const { injectUrl } = require('./app/injectUrl.js');
const { createGuestBookLoader } = require('./app/loadGuestBook.js');
const { createRegisterLoader } = require('./app/loadRegister.js');
const { fileUploadHandler } = require('./app/fileUploadHandler.js');

const guestBookLib = require('./app/guestBookHandlers.js');
const apiLib = require('./app/apiHandlers.js');
const loginLib = require('./app/loginHandlers.js');
const signupLib = require('./app/signupHandlers.js');
const { guestBookPageCreator, commentAdder } = guestBookLib;
const { guestBookApiHandler, guestBookQueryHandler } = apiLib;
const { loginHandler, serveLoginForm, logoutHandler } = loginLib;
const { serveSignupPage, registerUser } = signupLib;

const doNothing = (req, res, next) => next();

const createApp = (flowerCatalogConfig, sessions = {},
  fileLogger = doNothing) => {
  const { usersFile, commentsFile, templateFile, serveFrom } = flowerCatalogConfig;

  const guestBookHandlers = {
    '/guest-book': { 'GET': guestBookPageCreator },
    '/guest-book/add-comment': { 'POST': commentAdder }
  };

  const fileUploadHandlers = {
    '/file-upload': { 'POST': fileUploadHandler }
  };

  const loginHandlers = {
    '/login': { 'GET': serveLoginForm, 'POST': loginHandler(sessions) },
    '/logout': { 'GET': logoutHandler(sessions) },
    '/signup': { 'GET': serveSignupPage, 'POST': registerUser }
  };

  const apiHandlers = {
    '/api/guest-book': { 'GET': guestBookApiHandler },
    '/api/guest-book/q': { 'GET': guestBookQueryHandler }
  };

  const aliases = { '/': '/index.html' };

  const loadGuestBook = createGuestBookLoader(templateFile, commentsFile);
  const loadRegister = createRegisterLoader(usersFile);
  const loginRouter = createRouter(loginHandlers);
  const guestBookRouter = createRouter(guestBookHandlers);
  const apiRouter = createRouter(apiHandlers);
  const serveStatic = serveStaticFrom(serveFrom, aliases);
  const fileUploadRouter = createRouter(fileUploadHandlers);

  const handlers = [
    fileLogger,
    injectUrl,
    injectCookies,
    injectSession(sessions),
    fetchBodyParams,
    loadRegister,
    loginRouter,
    fileUploadRouter,
    loadGuestBook,
    guestBookRouter,
    apiRouter,
    methodNotSupportedHandler,
    serveStatic,
    notFoundHandler
  ];

  return createInitiator(handlers);
};

module.exports = { createApp };

const express = require('express');
const { injectCookies } = require('./injectCookies.js');
const { injectSession } = require('./injectSession.js');
const { createGuestBookLoader } = require('./loadGuestBook.js');
const { createRegisterLoader } = require('./loadRegister.js');
const { fileUploadHandler } = require('./fileUploadHandler.js');

const guestBookLib = require('./guestBookHandlers.js');
const apiLib = require('./apiHandlers.js');
const loginLib = require('./loginHandlers.js');
const signupLib = require('./signupHandlers.js');
const { guestBookPageCreator, commentAdder } = guestBookLib;
const { guestBookApiHandler, guestBookQueryHandler } = apiLib;
const { loginHandler, serveLoginForm, logoutHandler } = loginLib;
const { serveSignupPage, registerUser } = signupLib;

const doNothing = (req, res, next) => next();

const createApp = (config, sessions = {}, fileLogger = doNothing) => {
  const { usersFile, commentsFile, templateFile, serveFrom } = config;
  // const fileUploadHandlers = {
  //   '/file-upload': { 'POST': fileUploadHandler }
  // };
  // const fileUploadRouter = createRouter(fileUploadHandlers);

  const app = express();
  app.use(fileLogger);
  app.use(express.urlencoded({ extended: true }));
  app.use(injectCookies);
  app.use(injectSession(sessions));

  const loadRegister = createRegisterLoader(usersFile);
  const loginRouter = express.Router();
  loginRouter.use(loadRegister);
  loginRouter.get('/login', serveLoginForm);
  loginRouter.post('/login', loginHandler(sessions));
  loginRouter.get('/logout', logoutHandler(sessions));
  loginRouter.get('/signup', serveSignupPage);
  loginRouter.post('/signup', registerUser);
  loginRouter.use(express.static(serveFrom));
  app.use('/protected', loginRouter);

  const loadGuestBook = createGuestBookLoader(templateFile, commentsFile);
  const guestBookRouter = express.Router();
  guestBookRouter.use(loadGuestBook);
  guestBookRouter.get('/', guestBookPageCreator);
  guestBookRouter.post('/add-comment', commentAdder);
  app.use('/guest-book', guestBookRouter);

  const apiRouter = express.Router();
  apiRouter.use(loadGuestBook);
  apiRouter.get('/guest-book', guestBookApiHandler);
  apiRouter.get('/guest-book/q', guestBookQueryHandler);
  app.use('/api', apiRouter);

  app.use(express.static(serveFrom));

  return app;
};

module.exports = { createApp };

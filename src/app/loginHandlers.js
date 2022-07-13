const { getParams } = require('./getParams');

const logoutHandler = (sessions) => ({ session }, res) => {
  if (session) {
    const { sessionId } = session;
    delete sessions[sessionId];
    res.setHeader('set-cookie', 'sessionId=0;max-Age=0');
  }
  res.statusCode = 302;
  res.setHeader('location', '/');
  res.end();
};

const loginPage = () => `<html><head><title>Login</title></head><body><h1>LOGIN</h1><form action="/login" method="post"><div><label>Username: </label><input type="text" name="username"></div><div><label>Password: </label><input type="password" name="password"></div><div><input type="submit" value="Submit"></div></form></body></html>`;

const serveLoginForm = ({ session }, res) => {
  if (session) {
    res.statusCode = 302;
    res.setHeader('location', '/guest-book');
    res.end();
    return;
  }
  res.setHeader('content-type', 'text/html');
  res.end(loginPage());
};

const createSession = (username) => {
  const time = new Date();
  return { username, time, sessionId: time.getTime() };
};

const validateUser = ({ username, password }, users) => {
  return users.some((user) =>
    user.username === username && user.password === password);
};

const loginHandler = (sessions) => ({ bodyParams, users }, res) => {
  const user = getParams(bodyParams);
  if (!user.username || !user.password) {
    res.statusCode = 400;
    res.setHeader('content-type', 'text/plain');
    res.end('Provide user credentials');
    return;
  }

  let location = '/login';
  if (validateUser(user, users)) {
    const session = createSession(user.username);
    sessions[session.sessionId] = session;
    res.setHeader('set-cookie', 'sessionId=' + session.sessionId);
    location = '/guest-book';
  }

  res.statusCode = 302;
  res.setHeader('location', location);
  res.end();
};

module.exports = { loginHandler, serveLoginForm, logoutHandler };

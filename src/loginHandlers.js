const logoutHandler = (sessions) => ({ session }, res) => {
  if (session) {
    const { sessionId } = session;
    delete sessions[sessionId];
    res.clearCookie('sessionId');
  }
  res.redirect('/');
  res.end();
};

const loginPage = () => `<html><head><title>Login</title></head><body><h1>LOGIN</h1><form action="/protected/login" method="post"><div><label>Username: </label><input type="text" name="username"></div><div><label>Password: </label><input type="password" name="password"></div><div><input type="submit" value="Submit"></div></form></body></html>`;

const serveLoginForm = ({ session }, res) => {
  if (session) {
    res.redirect('/guest-book');
    return res.end();
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

const loginHandler = (sessions) => (req, res) => {
  const { body, users } = req;
  if (!body.username || !body.password) {
    res.statusCode = 400;
    res.setHeader('content-type', 'text/plain');
    return res.end('Provide user credentials');
  }

  let location = '/protected/login';
  if (validateUser(body, users)) {
    const session = createSession(body.username);
    sessions[session.sessionId] = session;
    res.cookie('sessionId', `${session.sessionId}`)
    location = '/guest-book';
  }

  res.redirect(location);
  res.end();
};

module.exports = { loginHandler, serveLoginForm, logoutHandler };

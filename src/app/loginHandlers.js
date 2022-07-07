const { getParams } = require('./getParams');

const logoutHandler = (sessions) => ({ session }, res) => {
  if (session) {
    const { sessionId } = session;
    delete sessions[sessionId];
    res.setHeader('set-cookie', `sessionId=${sessionId};max-Age=0`);
  }
  res.statusCode = 302;
  res.setHeader('location', '/');
  res.end();
};

const loginPage = () => `<html>
<head>
  <title>Login</title>
</head>
<body>
  <form action="/login" method="post">
    <div>
      <label>Username: </label>
      <input type="text" name="username">
    </div>
    <div>
      <input type="submit" value="Submit">
    </div>
  </form>
</body>
</html>`;

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

const loginHandler = (sessions) => ({ bodyParams }, res) => {
  const { username } = getParams(bodyParams);

  if (!username) {
    res.statusCode = 400;
    res.setHeader('content-type', 'text/plain');
    res.end('Provide username');
    return;
  }

  const session = createSession(username);
  sessions[session.sessionId] = session;
  res.statusCode = 302;
  res.setHeader('location', '/guest-book');
  res.setHeader('set-cookie', 'sessionId=' + session.sessionId);
  res.end();
};

module.exports = { loginHandler, serveLoginForm, logoutHandler };

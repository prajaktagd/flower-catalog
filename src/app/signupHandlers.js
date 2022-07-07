const { getParams } = require('./getParams.js');

const signupPage = () => `<html>
<head>
  <title>Signup</title>
</head>
<body>
  <h1>Signup</h1>
  <form action="/signup" method="post">
    <div>
      <label>Name: </label>
      <input type="text" name="name">
    </div>
    <div>
      <label>Username: </label>
      <input type="text" name="username">
    </div>
    <div>
      <label>Password: </label>
      <input type="password" name="password">
    </div>
    <div>
      <input type="submit" value="Submit">
    </div>
  </form>
</body>
</html>`;

const serveSignupPage = (req, res) => {
  res.setHeader('content-type', 'text/html');
  res.end(signupPage());
};

const registerUser = ({ bodyParams, users, persistUsers }, res) => {
  const userDetails = getParams(bodyParams);
  const { name, username, password } = userDetails;

  let location = '/signup';
  if (name && username && password) {
    users.push(userDetails);
    persistUsers(users);
    location = '/login';
  }

  res.statusCode = 302;
  res.setHeader('location', location);
  res.end();
};

module.exports = { serveSignupPage, registerUser };

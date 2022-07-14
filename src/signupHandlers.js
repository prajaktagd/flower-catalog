const signupPage = () => `<html>
<head>
  <title>Signup</title>
  <script src="js/signupScript.js"></script>
</head>
<body>
  <h1>Signup</h1>
  <div id="message"></div>
  <form>
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
      <button id="submit" type="button">Submit</button>
    </div>
  </form>
</body>
</html>`;

const serveSignupPage = (req, res) => {
  res.setHeader('content-type', 'text/html');
  res.end(signupPage());
};

const registerUser = (req, res) => {
  const { body, users, persistUsers } = req;
  const { name, username, password } = body;

  if (!name || !username || !password) {
    res.statusCode = 400;
    return res.end();
  }

  users.push(body);
  persistUsers(users);
  res.end();
};

module.exports = { serveSignupPage, registerUser };

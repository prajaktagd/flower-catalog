const { read, write } = require('./readWrite.js');

const createRegisterLoader = (usersFile) => {
  let usersString = read(usersFile);
  const users = usersString.length > 0 ? JSON.parse(usersString) : [];

  return (req, res, next) => {
    const { pathname } = req.url;

    if (['/signup', '/login'].includes(pathname)) {
      req.users = users;
      req.persistUsers = (users) => {
        write(usersFile, JSON.stringify(users));
      };
    }

    next();
  };
};

module.exports = { createRegisterLoader };

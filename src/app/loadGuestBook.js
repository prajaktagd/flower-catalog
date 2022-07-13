const { GuestBook } = require('./guestBook.js');
const { read, write } = require('./readWrite.js');

const createGuestBookLoader = (templateFile, commentsFile) => {
  let template = read(templateFile);
  let commentsString = read(commentsFile);

  const comments = commentsString.length > 0 ? JSON.parse(commentsString) : [];
  const guestBook = new GuestBook(template, comments);

  return (req, res, next) => {
    const { pathname } = req.url;
    const paths = ['/guest-book', '/guest-book/add-comment', '/api/guest-book',
      '/api/guest-book/q'];

    if (paths.includes(pathname)) {
      req.guestBook = guestBook;
      req.saveComments = (comments) => {
        write(commentsFile, JSON.stringify(comments));
      };
    }

    next();
  };
};

module.exports = { createGuestBookLoader };

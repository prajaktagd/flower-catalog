const fs = require('fs');
const { GuestBook } = require('./guestBook.js');

const read = (file) => fs.readFileSync(file, 'utf8');
const write = (file, content) => fs.writeFileSync(file, content, 'utf8');

const createGuestBookLoader = (templateFile, commentsFile) => {
  let template = read(templateFile);
  let commentsString = read(commentsFile);

  const comments = commentsString.length > 0 ? JSON.parse(commentsString) : [];
  const guestBook = new GuestBook(template, comments);

  return (req, res, next) => {
    const { pathname } = req.url;

    if (['/guest-book', '/guest-book/add-comment', '/api/guest-book',
      '/api/guest-book/q'].includes(pathname)) {
      req.guestBook = guestBook;
      req.saveComments = (comments) => {
        write(commentsFile, JSON.stringify(comments));
      };
    }

    next();
  };
};

module.exports = { createGuestBookLoader };

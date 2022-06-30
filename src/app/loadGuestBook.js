const fs = require('fs');
const { GuestBook } = require('./guestBook.js');

const readData = (fileName) => fs.readFileSync(fileName, 'utf8');
const writeData = (fileName, content) => {
  fs.writeFileSync(fileName, content, 'utf8');
};

const createGuestBookLoader = (guestBookTemplateFile, commentsFile) => {
  let template = readData(guestBookTemplateFile);
  let commentsString = readData(commentsFile);

  const comments = commentsString.length > 0 ? JSON.parse(commentsString) : [];
  const guestBook = new GuestBook(template, comments);

  return (req, res) => {
    const { pathname } = req.url;
    if (['/guest-book', '/guest-book/add-comment', '/api/guest-book',
      '/api/guest-book/q'].includes(pathname)) {
      req.guestBook = guestBook;
      req.saveComments = (comments) => {
        writeData(commentsFile, JSON.stringify(comments));
      };
    }
    return false;
  };
};

module.exports = { createGuestBookLoader };

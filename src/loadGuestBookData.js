const fs = require('fs');
const { GuestBook } = require('./guestBook.js');

const createGuestBookDataLoader = (guestBookTemplateFile, commentsFile) => {
  let template = fs.readFileSync(guestBookTemplateFile, 'utf8');
  let commentsString = fs.readFileSync(commentsFile, 'utf8');

  let comments = [];
  if (commentsString.length > 0) {
    comments = JSON.parse(commentsString);
  }
  const guestBook = new GuestBook(template, comments);

  return (request, response) => {
    request.guestBook = guestBook;
    request.commentsFile = commentsFile;
    return false;
  };
};

exports.createGuestBookDataLoader = createGuestBookDataLoader;

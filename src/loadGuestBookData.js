const fs = require('fs');
const { GuestBook } = require('./guestBook.js');

const readData = (fileName) => fs.readFileSync(fileName, 'utf8');
const writeData = (fileName, content) => {
  fs.writeFileSync(fileName, content, 'utf8');
};

const createGuestBookDataLoader = (guestBookTemplateFile, commentsFile) => {
  let template = readData(guestBookTemplateFile);
  let commentsString = readData(commentsFile);

  let comments = [];
  if (commentsString.length > 0) {
    comments = JSON.parse(commentsString);
  }
  const guestBook = new GuestBook(template, comments);

  return (request, response) => {
    request.guestBook = guestBook;
    request.saveComments = (comments) => {
      writeData(commentsFile, JSON.stringify(comments));
    }
    return false;
  };
};

exports.createGuestBookDataLoader = createGuestBookDataLoader;

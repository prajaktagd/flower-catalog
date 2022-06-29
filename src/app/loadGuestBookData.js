const fs = require('fs');
const { GuestBook } = require('./guestBook.js');

const readData = (fileName) => fs.readFileSync(fileName, 'utf8');
const writeData = (fileName, content) => {
  fs.writeFileSync(fileName, content, 'utf8');
};

const createGuestBookDataLoader = (guestBookTemplateFile, commentsFile) => {
  let template = readData(guestBookTemplateFile);
  let commentsString = readData(commentsFile);

  const comments = commentsString.length > 0 ? JSON.parse(commentsString) : [];
  const guestBook = new GuestBook(template, comments);

  return (req, res) => {
    req.guestBook = guestBook;
    req.saveComments = (comments) => {
      writeData(commentsFile, JSON.stringify(comments));
    }
    return false;
  };
};

exports.createGuestBookDataLoader = createGuestBookDataLoader;

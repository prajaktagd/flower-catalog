const fs = require('fs');

const createGuestBookDataLoader = (commentsFile, guestBookTemplateFile) => {
  let commentsString = fs.readFileSync(commentsFile, 'utf8');
  let template = fs.readFileSync(guestBookTemplateFile, 'utf8');

  let comments = [];
  if (commentsString.length > 0) {
    comments = JSON.parse(commentsString);
  }

  return (request, response) => {
    request.comments = comments;
    request.template = template;
    request.commentsFile = commentsFile;
    return false;
  };
};

exports.createGuestBookDataLoader = createGuestBookDataLoader;

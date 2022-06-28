const fs = require('fs');

const commentsHandler = ({ params, guestBook, saveComments }, response) => {
  const { name, comment } = params;

  if (name && comment) {
    guestBook.addComment(name, comment);
    saveComments(guestBook.getComments());
  }

  response.statusCode = 302;
  response.setHeader('location', '/guest-book');
  response.send('');
  return true;
};

const guestBookPageCreator = ({ guestBook }, response) => {
  response.setHeader('content-type', 'text/html');
  response.send(guestBook.toHtml());
  return true;
};

const guestBookHandler = (request, response) => {
  const { uri } = request;
  if (uri === '/guest-book') {
    guestBookPageCreator(request, response);
    return true;
  }
  if (uri === '/add-comment') {
    commentsHandler(request, response);
    return true;
  }
  return false;
};

exports.guestBookHandler = guestBookHandler;

const fs = require('fs');

const commentsHandler = ({ params, guestBook, commentsFile }, response) => {
  guestBook.addComment(params.name, params.comment);
  const comments = guestBook.getComments();
  fs.writeFileSync(commentsFile, JSON.stringify(comments), 'utf8');

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

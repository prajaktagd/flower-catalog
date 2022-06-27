const fs = require('fs');
const { generateTable } = require('./generateTable.js');

const parseComment = ({ name, comment }) => {
  return {
    name,
    comment,
    dateTime: new Date().toLocaleString()
  };
};

const commentHandler = ({ params, comments, commentsFile }, response) => {
  comments.push(parseComment(params));
  fs.writeFileSync(commentsFile, JSON.stringify(comments), 'utf8');

  response.statusCode = 302;
  response.setHeader('location', '/guest-book');
  response.send('');
  return true;
};

const guestBookPageCreator = ({ template, comments }, response) => {
  const html = template.replace('__TABLE__', generateTable(comments));
  response.setHeader('content-type', 'text/html');
  response.send(html);
  return true;
};

const guestBookHandler = (request, response) => {
  const { uri } = request;
  if (uri === '/guest-book') {
    guestBookPageCreator(request, response);
    return true;
  }
  if (uri === '/add-comment') {
    commentHandler(request, response);
    return true;
  }
  return false;
};

exports.guestBookHandler = guestBookHandler;

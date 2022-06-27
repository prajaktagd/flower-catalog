const fs = require('fs');
const { generateTable } = require('./generateTable.js');

const parseComment = ({ name, comment }) => {
  return {
    name,
    comment,
    dateTime: new Date().toLocaleString()
  };
};

const createCommentHandler = (commentsFile, comments) => {
  return ({ params }, response) => {
    comments.push(parseComment(params));
    fs.writeFileSync(commentsFile, JSON.stringify(comments), 'utf8');

    response.statusCode = 302;
    response.setHeader('location', '/guest-book');
    response.send('');
    return true;
  };
};

const createGuestBookHandler = (template, comments) => {
  return (request, response) => {
    const html = template.replace('__TABLE__', generateTable(comments));
    response.setHeader('content-type', 'text/html');
    response.send(html);
    return true;
  };
};

const createFlowerCatalogHandler = (commentsFile, guestBookTemplateFile) => {
  let commentsString = fs.readFileSync(commentsFile, 'utf8');
  let template = fs.readFileSync(guestBookTemplateFile, 'utf8');

  let comments = [];
  if (commentsString.length > 0) {
    comments = JSON.parse(commentsString);
  }

  return (request, response) => {
    const { uri } = request;
    if (uri === '/guest-book') {
      const guestBookHandler = createGuestBookHandler(template, comments);
      guestBookHandler(request, response);
      return true;
    }
    if (uri === '/add-comment') {
      const commentHandler = createCommentHandler(commentsFile, comments);
      commentHandler(request, response);
      return true;
    }
    return false;
  };
};

exports.createFlowerCatalogHandler = createFlowerCatalogHandler;

const fs = require('fs');
const { generateTable } = require('./generateTable.js');

const parseComment = ({ name, comment }) => {
  return {
    name,
    comment,
    dateTime: new Date().toString()
  };
};

const createCommentHandler = (commentsFile, comments) => {
  return ({ params }, response) => {
    comments.push(parseComment(params));
    fs.writeFileSync(commentsFile, JSON.stringify(comments), 'utf8');

    response.setHeader('content-type', 'text/html');
    response.send(`${generateTable(comments)}`);
    return true;
  };
};

const createFlowerCatalogHandler = (commentsFile) => {
  let commentsString = fs.readFileSync(commentsFile, 'utf8');
  let comments = [];
  if (commentsString.length > 0) {
    comments = JSON.parse(commentsString);
  }

  return (request, response) => {
    const { uri } = request;
    if (uri === '/add-comment') {
      const commentHandler = createCommentHandler(commentsFile, comments);
      commentHandler(request, response);
      return true;
    }
    return false;
  };
};

exports.createFlowerCatalogHandler = createFlowerCatalogHandler;

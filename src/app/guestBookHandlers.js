const { getParams } = require('./getParams');

const commentAdder = (req, res) => {
  const { bodyParams, guestBook, saveComments, session } = req;
  const params = getParams(bodyParams);

  if (!session) {
    res.statusCode = 302;
    res.setHeader('location', '/login');
    res.end();
    return;
  }

  if (!params.name || !params.comment) {
    res.statusCode = 400;
    res.end();
    return;
  }

  params.dateTime = new Date().toLocaleString();
  guestBook.addComment(params);
  saveComments(guestBook.getComments());
  res.end();
};

const guestBookPageCreator = ({ guestBook, headers, session }, res) => {
  if (!session) {
    res.statusCode = 302;
    res.setHeader('location', '/login');
    res.end();
    return;
  }

  if (headers.accept === 'application/json') {
    const comments = guestBook.getComments();
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify(comments));
    return;
  }

  res.setHeader('content-type', 'text/html');
  res.end(guestBook.toHtml());
};

module.exports = { guestBookPageCreator, commentAdder };

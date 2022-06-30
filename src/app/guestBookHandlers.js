const { getParams } = require('./getParams');

const commentsAdder = ({ bodyParams, guestBook, saveComments }, res) => {
  const params = getParams(bodyParams);

  if (params.name && params.comment) {
    params.dateTime = new Date().toLocaleString();
    guestBook.addComment(params);
    saveComments(guestBook.getComments());
  }

  res.statusCode = 302;
  res.setHeader('location', '/guest-book');
  res.end('');
};

const guestBookPageCreator = (req, res) => {
  const { accept } = req.headers;
  if (accept === 'application/json') {
    const guestBook = req.guestBook.getComments();
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify(guestBook));
    return;
  }
  res.setHeader('content-type', 'text/html');
  res.end(req.guestBook.toHtml());
};

module.exports = { guestBookPageCreator, commentsAdder };

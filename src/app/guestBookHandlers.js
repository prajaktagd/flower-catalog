const { getQueryParams } = require('./getQueryParams');

const commentsAdder = ({ url, guestBook, saveComments }, res) => {
  const params = getQueryParams(url);

  if (params.name && params.comment) {
    params.dateTime = new Date().toLocaleString();
    guestBook.addComment(params);
    saveComments(guestBook.getComments());
  }

  res.statusCode = 302;
  res.setHeader('location', '/guest-book');
  res.end('');
  return true;
};

const guestBookPageCreator = (req, res) => {
  const { accept } = req.headers;
  if (accept === 'application/json') {
    const guestBook = req.guestBook.getComments();
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify(guestBook));
    return true;
  }
  res.setHeader('content-type', 'text/html');
  res.end(req.guestBook.toHtml());
  return true;
};

module.exports = { guestBookPageCreator, commentsAdder };

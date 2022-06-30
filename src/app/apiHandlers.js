const { getParams } = require('./getParams.js');

const guestBookApiHandler = (req, res) => {
  const guestBook = req.guestBook.getComments();
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify(guestBook));
};

const guestBookQueryHandler = ({ url, guestBook }, res) => {
  const params = getParams(url.searchParams);
  const comments = guestBook.searchComments(params);
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify(comments));
};

module.exports = { guestBookApiHandler, guestBookQueryHandler };

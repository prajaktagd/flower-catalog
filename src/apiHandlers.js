const { getQueryParams } = require("./app/getQueryParams");

const guestBookApiHandler = (req, res) => {
  const guestBook = req.guestBook.getComments();
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify(guestBook));
  return true;
};

const guestBookQueryHandler = ({ url, guestBook }, res) => {
  const params = getQueryParams(url);
  const comments = guestBook.searchComments(params);
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify(comments));
  return true;
};

module.exports = { guestBookApiHandler, guestBookQueryHandler };

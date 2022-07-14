const guestBookApiHandler = (req, res) => {
  const guestBook = req.guestBook.getComments();
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify(guestBook));
};

const guestBookQueryHandler = ({ query, guestBook }, res) => {
  const comments = guestBook.searchComments(query);
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify(comments));
};

module.exports = { guestBookApiHandler, guestBookQueryHandler };

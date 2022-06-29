const getGuestBookParams = ({ searchParams }) => {
  const params = {};
  for (const [param, value] of searchParams.entries()) {
    params[param] = value;
  }
  params.dateTime = new Date().toLocaleString();
  return params;
};

const commentsHandler = ({ url, guestBook, saveComments }, res) => {
  const params = getGuestBookParams(url);
  if (params.name && params.comment) {
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

module.exports = { guestBookPageCreator, commentsHandler };

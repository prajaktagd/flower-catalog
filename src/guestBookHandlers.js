const commentDetails = (name, comment) => {
  const dateTime = new Date().toLocaleString();
  return { name, comment, dateTime };
};

const validateSession = (req, res, next) => {
  const { session } = req;
  if (!session) {
    res.redirect('/protected/login');
    return res.end();
  }
  next();
};

const commentAdder = (req, res) => {
  const { body, guestBook, saveComments, session } = req;

  if (!body.comment) {
    res.statusCode = 400;
    return res.end();
  }

  guestBook.addComment(commentDetails(session.username, body.comment));
  saveComments(guestBook.getComments());
  res.end();
};

const guestBookPageCreator = (req, res) => {
  const { guestBook, headers } = req;

  if (headers.accept === 'application/json') {
    const comments = guestBook.getComments();
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify(comments));
    return;
  }

  res.setHeader('content-type', 'text/html');
  res.end(guestBook.toHtml());
};

module.exports = { guestBookPageCreator, commentAdder, validateSession };

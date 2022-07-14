const commentAdder = (req, res) => {
  const { body, guestBook, saveComments, session } = req;

  if (!session) {
    res.redirect('/protected/login');
    return res.end();
  }

  if (!body.name || !body.comment) {
    res.statusCode = 400;
    return res.end();
  }

  body.dateTime = new Date().toLocaleString();
  guestBook.addComment(body);
  saveComments(guestBook.getComments());
  res.end();
};

const guestBookPageCreator = (req, res) => {
  const { guestBook, headers, session } = req;

  if (!session) {
    res.redirect('/protected/login');
    return res.end();
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

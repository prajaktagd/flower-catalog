const notFoundHandler = (req, res) => {
  res.statusCode = 404;
  res.setHeader('content-type', 'text/plain');
  res.end(`${req.url.pathname} Not Found`);
};

module.exports = { notFoundHandler };

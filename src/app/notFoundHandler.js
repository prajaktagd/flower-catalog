const notFoundHandler = (req, res) => {
  res.statusCode = 404;
  res.setHeader('content-type', 'text/plain');
  res.end(`${req.url} Not Found`);
  return true;
};

module.exports = { notFoundHandler };

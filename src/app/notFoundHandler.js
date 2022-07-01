const notFoundHandler = ({ url }, res) => {
  res.statusCode = 404;
  res.setHeader('content-type', 'text/plain');
  res.end(`${url.pathname} Not Found`);
};

module.exports = { notFoundHandler };

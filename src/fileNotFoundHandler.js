const fileNotFoundHandler = (request, response) => {
  response.statusCode = 404;
  response.setHeader('content-type', 'text/plain');
  response.send('File Not Found');
  return true;
};

exports.fileNotFoundHandler = fileNotFoundHandler;

const { createServer } = require('http');

const startServer = (PORT, requestHandler) => {
  const server = createServer(requestHandler);
  server.listen(PORT, () => {
    console.log(`Started listening on ${server.address().port}`);
  });
};

module.exports = { startServer };

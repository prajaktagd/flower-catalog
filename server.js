const fs = require('fs');
const { createServer } = require('net');
const { parseRequest } = require('./src/parseRequest.js');
const { Response } = require('./src/response.js');
const { createHandler } = require('./src/createHandler');
const { createGuestBookDataLoader } = require('./src/loadGuestBookData.js');
const { guestBookHandler } = require('./src/guestBookHandler.js');
const { createFileContentServer } = require('./src/serveFileContent.js');
const { fileNotFoundHandler } = require('./src/fileNotFoundHandler.js');

const log = (...contents) => {
  const content = [new Date().toLocaleString(), ...contents, '\n'].join(' ');
  fs.appendFile('log.txt', content, () => { });
};

const onNewConnection = (socket, handler) => {
  socket.setTimeout(5000);
  socket.setEncoding('utf8');
  socket.on('error', (err) => log(err));

  socket.on('data', (chunk) => {
    const request = parseRequest(chunk);
    log(request.method, request.uri);

    const response = new Response(socket);
    handler(request, response);
  });

  socket.on('timeout', () => {
    socket.destroy();
  })
};

const startServer = (PORT, handler) => {
  const server = createServer((socket) => onNewConnection(socket, handler));

  server.listen(3434, () => {
    log(`Started listening on http://localhost:${server.address().port}`);
  });
};

const main = (serveFrom) => {
  const commentsFile = './data/comments.json';
  const templateFile = './resources/guest-book-template.html';
  const serveFileContent = createFileContentServer(serveFrom);
  const loadGuestBookData = createGuestBookDataLoader(commentsFile, templateFile);

  const handlers = [loadGuestBookData, guestBookHandler, serveFileContent,
    fileNotFoundHandler];

  startServer(9999, createHandler(handlers));
};

main(...process.argv.slice(2));

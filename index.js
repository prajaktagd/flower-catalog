const { startServer } = require('./src/server/server.js');
const { createApp } = require('./src/app.js');

const flowerCatalogConfig = {
  templateFile: './resources/guest-book-template.html',
  commentsFile: './data/comments.json',
  usersFile: './data/users.json',
  serveFrom: process.argv[2] || './public'
}

const app = createApp(flowerCatalogConfig, {});
startServer(9999, app);

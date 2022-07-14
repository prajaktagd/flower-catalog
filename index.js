const { createApp } = require('./src/app.js');
const { logHandler } = require('./src/logHandler.js');

const flowerCatalogConfig = {
  templateFile: './resources/guest-book-template.html',
  commentsFile: './data/comments.json',
  usersFile: './data/users.json',
  serveFrom: process.argv[2] || './public'
};

const app = createApp(flowerCatalogConfig, {}, logHandler);
app.listen(9999, () => console.log(`Started listening on 9999`));

const { startServer } = require('./src/server/server.js');
const { app } = require('./src/app.js');
const requestHandler = app(...process.argv.slice(2));
startServer(9999, requestHandler);

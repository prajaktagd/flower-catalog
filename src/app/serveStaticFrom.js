const fs = require('fs');
const mime = require('mime-types');

const isDirectory = (path) => fs.statSync(path).isDirectory();

const determineContentType = (fileName) => {
  return mime.lookup(fileName) || 'text/plain';
};

const accumulateFileContents = (directory) => {
  let contents = {};
  const dirContents = fs.readdirSync(directory);

  dirContents.forEach((dirContent) => {
    const path = `${directory}/${dirContent}`;
    if (isDirectory(path)) {
      contents = { ...contents, ...accumulateFileContents(path) };
    } else {
      const fileContent = fs.readFileSync(path);
      contents[path] = fileContent;
    }
  });
  return contents;
};

const serveStaticFrom = (root) => {
  const fileContents = accumulateFileContents(root);

  return ({ url }, res) => {
    const pathname = url.pathname === '/' ? '/index.html' : url.pathname;
    const fileName = root + pathname;
    const content = fileContents[fileName];
    if (!content) {
      return false;
    }
    res.setHeader('content-type', determineContentType(fileName));
    res.end(content);
    return true;
  }
};

module.exports = { serveStaticFrom };

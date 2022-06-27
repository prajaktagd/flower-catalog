const fs = require('fs');

const isDirectory = (path) => fs.statSync(path).isDirectory();
const getExtension = (file) => file.slice(file.lastIndexOf('.') + 1);

const determineContentType = (fileName) => {
  const mimeTypes = {
    jpeg: 'image/jpeg',
    jpg: 'image/jpg',
    css: 'text/css',
    html: 'text/html',
    js: 'text/javascript',
    png: 'image/png',
    gif: 'image/gif',
    pdf: 'application/pdf'
  };

  return mimeTypes[getExtension(fileName)] || 'text/plain';
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

const createFileContentServer = (directory) => {
  const fileContents = accumulateFileContents(directory);

  return ({ uri }, response) => {
    const fileName = directory + uri;
    const content = fileContents[fileName];
    if (!content) {
      return false;
    }
    response.setHeader('content-type', determineContentType(fileName));
    response.send(content);
    return true;
  }
};

module.exports = { createFileContentServer };

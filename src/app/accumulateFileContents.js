const fs = require('fs');

const isDirectory = (path) => fs.statSync(path).isDirectory();

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

module.exports = { accumulateFileContents };

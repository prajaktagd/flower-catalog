const fs = require('fs');

const fileUploadHandler = ({ bodyParams }, res, next) => {
  bodyParams.file.forEach((fileInfo) => {
    fs.writeFileSync('uploadedFiles/' + fileInfo.fileName, fileInfo.fileContent);
  });
  res.setHeader('content-type', 'text/plain');
  res.end('Files Uploaded');
};

module.exports = { fileUploadHandler };

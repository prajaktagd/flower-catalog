const fs = require('fs');

const fileUploadHandler = (req, res, next) => {
  req.body.file.forEach((fileInfo) => {
    fs.writeFileSync('uploadedFiles/' + fileInfo.fileName, fileInfo.fileContent);
  });
  res.setHeader('content-type', 'text/plain');
  res.end('Files Uploaded');
};

module.exports = { fileUploadHandler };

const { parseBody } = require('./parseMultipartBody.js');

const getBoundary = (contentType) => {
  const boundaryString = contentType.split(';')[1];
  return boundaryString.split('=')[1].trim();
};

const fetchBodyParams = (req, res, next) => {
  if (req.method !== 'POST') {
    next();
    return;
  }

  let data = '';
  const buffers = [];
  req.on('data', (chunk) => {
    data += chunk;
    buffers.push(chunk);
  });

  req.on('end', () => {
    req.bodyParams = new URLSearchParams(data);
    const contentType = req.headers['content-type'];
    if (contentType.startsWith('multipart')) {
      const boundaryBuf = Buffer.from(getBoundary(contentType), 'utf8');
      req.bodyParams = parseBody(Buffer.concat(buffers), boundaryBuf);
      console.log(req.bodyParams);
    }
    next();
  });
};

module.exports = { fetchBodyParams };

const parseBodyParams = (req, res, router) => {
  if (req.method !== 'POST') {
    router(req, res);
    return;
  }

  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });

  req.on('end', () => {
    req.bodyParams = new URLSearchParams(data);
    router(req, res);
  });
};

module.exports = parseBodyParams;

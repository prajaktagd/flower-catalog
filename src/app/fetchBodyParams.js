const fetchBodyParams = (req, res, next) => {
  if (req.method !== 'POST') {
    next();
    return;
  }

  let data = '';
  req.on('data', (chunk) => data += chunk);

  req.on('end', () => {
    req.bodyParams = new URLSearchParams(data);
    next();
  });
};

module.exports = { fetchBodyParams };

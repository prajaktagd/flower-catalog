const parseCookies = (cookiesString) => {
  const cookies = {};
  if (!cookiesString) {
    return cookies;
  }
  const rawCookies = cookiesString.split(';');
  rawCookies.forEach((cookie) => {
    const [name, value] = cookie.split('=');
    cookies[name] = value;
  });
  return cookies;
};

const injectCookies = (req, res, next) => {
  const cookiesString = req.headers.cookie;
  req.cookies = parseCookies(cookiesString);
  next();
};

module.exports = { injectCookies };

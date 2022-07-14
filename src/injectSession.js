const injectSession = (sessions) => (req, res, next) => {
  const { sessionId } = req.cookies;
  if (!sessions[sessionId]) {
    next();
    return;
  }

  req.session = sessions[sessionId];
  next();
};

module.exports = { injectSession };

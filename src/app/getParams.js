const getParams = (rawParams) => {
  const params = {};
  for (const [param, value] of rawParams.entries()) {
    params[param] = value;
  }
  return params;
};

exports.getParams = getParams;

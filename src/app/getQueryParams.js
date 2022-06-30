const getQueryParams = ({ searchParams }) => {
  const params = {};
  for (const [param, value] of searchParams.entries()) {
    params[param] = value;
  }
  return params;
};

exports.getQueryParams = getQueryParams;

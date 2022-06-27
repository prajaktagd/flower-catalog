const parseUri = (rawUri) => {
  const params = {};
  const [uri, queryString] = rawUri.split('?');
  if (queryString) {
    const paramStrings = queryString.split('&');
    paramStrings.forEach((paramString) => {
      const [param, value] = paramString.split('=');
      params[param] = value;
    });
  }
  return { uri, params };
};

const parseRequestLine = (line) => {
  const [method, uri, httpVersion] = line.split(' ');
  return { method, ...parseUri(uri), httpVersion };
};

const parseHeaders = (lines) => {
  const headers = {};
  let index = 0;
  while (index < lines.length && lines[index].length > 0) {
    const line = lines[index];
    const separatorIndex = line.indexOf(':');
    const key = line.slice(0, separatorIndex).toLowerCase().trim();
    const value = line.slice(separatorIndex + 1).trim();
    headers[key] = value;
    index++;
  }
  return headers;
};

const parseRequest = (chunk) => {
  const lines = chunk.split('\r\n');
  const requestLine = parseRequestLine(lines[0]);
  const headers = parseHeaders(lines.slice(1));
  return { ...requestLine, headers };
};

module.exports = { parseRequest, parseRequestLine, parseHeaders };

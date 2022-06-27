const CRLF = '\r\n';

const statusLine = (statusCode) => {
  const statusMessages = {
    200: 'OK', 404: 'Not Found', 301: 'Moved Permanently', 302: 'Found'
  };

  const statusMessage = statusMessages[statusCode];
  return `HTTP/1.1 ${statusCode} ${statusMessage}\r\n`;
};

const formatHeaders = (headers) => {
  return Object.entries(headers).map(([key, val]) => `${key}:${val}${CRLF}`);
};

class Response {
  #socket;
  #statusCode;
  #headers;

  constructor(socket) {
    this.#socket = socket;
    this.#statusCode = 200;
    this.#headers = {};
  }

  setHeader(header, value) {
    this.#headers[header] = value;
  }

  set statusCode(code) {
    this.#statusCode = code;
  }

  #write(data) {
    this.#socket.write(data);
  }

  send(body) {
    this.setHeader('content-length', body.length);

    this.#write(statusLine(this.#statusCode));
    this.#write(formatHeaders(this.#headers).join(''));
    this.#write(CRLF);
    this.#write(body);
  }
}

module.exports = { Response };

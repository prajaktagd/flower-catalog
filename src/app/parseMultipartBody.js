const CRLF = '\r\n';

const splitBuffer = (buffer, delimiter) => {
  const chunks = [];
  let buf = buffer;
  while (buf.includes(delimiter)) {
    const index = buf.indexOf(delimiter);
    const chunk = buf.slice(0, index);
    chunks.push(chunk);
    buf = buf.slice(index + delimiter.length);
  }
  chunks.push(buf);
  return chunks;
};

const formatKey = (key) => key.toLowerCase().trim();

const parseDisposition = (content) => {
  const attributes = {};
  const list = content.split(';');
  const value = list[0];
  list.slice(1).forEach((attriStr) => {
    const [key, val] = attriStr.split('=');
    attributes[formatKey(key)] = JSON.parse(val.trim());
  });
  return { value, attributes };
};

const parseHeaders = (headersStr) => {
  const headers = {};
  headersStr.split('\r\n').forEach((headerStr) => {
    let [key, val] = headerStr.split(':');
    key = formatKey(key);
    val = val.trim();
    if (key === 'content-disposition') {
      val = parseDisposition(val);
    }
    headers[key] = val;
  });
  return headers;
};

const parseFileInfo = (headers, contentBuf) => {
  const fileName = headers['content-disposition'].attributes.filename;
  const contentType = headers['content-type'];
  const eof = Buffer.from(CRLF + '--', 'utf8');
  const fileContent = splitBuffer(contentBuf, eof)[0];
  return { fileName, contentType, fileContent };
};

const getField = (headers) => headers['content-disposition'].attributes.name;

const parseBody = (body, boundary) => {
  const chunks = splitBuffer(body, boundary);
  const parsedBody = {};
  chunks.slice(1, -1).forEach((chunk) => {
    const CRLFs = Buffer.from(CRLF + CRLF, 'utf8');
    const [headerBuf, contentBuf] = splitBuffer(chunk, CRLFs);
    const headers = parseHeaders(headerBuf.toString().trim());
    const fieldName = getField(headers);
    if (headers['content-type']) {
      const fileInfo = parseFileInfo(headers, contentBuf);
      parsedBody[fieldName] = parsedBody[fieldName] ? parsedBody[fieldName] : [];
      parsedBody[fieldName].push(fileInfo);
      return;
    }
    parsedBody[fieldName] = contentBuf.toString().split('\r\n--')[0];
  });
  return parsedBody;
};

module.exports = { parseBody };

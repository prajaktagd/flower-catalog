const { generateHtml } = require('./generateHtml.js');
const getHeaders = (comment) => Object.keys(comment);

const tableElement = (contents) => ['table', {}, ...contents];
const thElement = (content) => ['th', {}, content];
const tdElement = (content) => ['td', {}, content];
const trElement = (contents) => ['tr', {}, ...contents];

const generateTable = (comments) => {
  const headers = getHeaders(comments[0]);
  const headerRow = trElement(headers.map(thElement));
  const rows = comments.map((comment) => {
    const trContents = headers.map((header) => tdElement(comment[header]));
    return trElement(trContents);
  });
  const table = tableElement([headerRow, ...rows]);
  return generateHtml(table);
};

exports.generateTable = generateTable;

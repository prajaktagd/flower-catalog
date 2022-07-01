const { generateHtml } = require('./generateHtml.js');
const getHeaders = () => ['dateTime', 'name', 'comment'];

const tableElement = (contents) => ['table', {}, ...contents];
const thElement = (content) => ['th', {}, content];
const tdElement = (content) => ['td', {}, content];
const trElement = (contents) => ['tr', {}, ...contents];

const generateTable = (comments) => {
  const headers = getHeaders();
  const headerRow = trElement(headers.map(thElement));

  const rows = comments.map((comment) => {
    const trContents = headers.map((header) => tdElement(comment[header]));
    return trElement(trContents);
  });

  const tableDOM = tableElement([headerRow, ...rows]);
  return generateHtml(tableDOM);
};

exports.generateTable = generateTable;

const { generateHtml } = require('./generateHtml.js');
const getHeaders = () => ['name', 'comment', 'dateTime'];

const tBodyElement = (attribs, contents) => ['tbody', attribs, ...contents];
const thElement = (content) => ['th', {}, content];
const tdElement = (content) => ['td', {}, content];
const trElement = (contents) => ['tr', {}, ...contents];

const generateTable = (comments) => {
  const headers = getHeaders();
  // const headerRow = trElement(headers.map(thElement));

  const rows = comments.map((comment) => {
    const trContents = headers.map((header) => tdElement(comment[header]));
    return trElement(trContents);
  });

  const tableDOM = tBodyElement({ id: 'comments' }, [...rows]);
  return generateHtml(tableDOM);
};

exports.generateTable = generateTable;

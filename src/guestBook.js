const { generateTable } = require('./generateTable.js');

const parseComment = (name, comment) => {
  return {
    name,
    comment,
    dateTime: new Date().toLocaleString()
  };
};

class GuestBook {
  #template;
  #comments;
  constructor(template, comments) {
    this.#template = template;
    this.#comments = comments;
  }

  toHtml() {
    const tableHtml = generateTable(this.#comments);
    return this.#template.replace('__TABLE__', tableHtml);
  }

  addComment(name, comment) {
    this.#comments.push(parseComment(name, comment));
  }

  getComments() {
    return this.#comments;
  }
}

exports.GuestBook = GuestBook;

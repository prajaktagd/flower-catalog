const { generateTable } = require('./generateTable.js');

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

  addComment(params) {
    this.#comments.unshift(params);
  }

  getComments() {
    return this.#comments;
  }
}

exports.GuestBook = GuestBook;

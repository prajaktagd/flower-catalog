const { generateTable } = require('./generateTable.js');

const isPresent = (field, commentDetails) => {
  const values = Object.values(commentDetails);
  return values.some((value) => value.includes(field));
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

  searchComments({ name, comment, dateTime }) {
    const field = name || comment || dateTime;
    return this.#comments.filter((commentDetails) =>
      isPresent(field, commentDetails));
  }

  addComment(params) {
    this.#comments.unshift(params);
  }

  getComments() {
    return this.#comments;
  }
}

exports.GuestBook = GuestBook;

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

  #commentsInReverse() {
    const comments = this.#comments.slice(0);
    return comments.reverse();
  }

  toHtml() {
    const tableHtml = generateTable(this.#commentsInReverse());
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

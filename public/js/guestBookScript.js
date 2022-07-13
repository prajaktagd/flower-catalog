(function () {
  const createTrContent = ({ name, comment, dateTime }) =>
    `<td>${name}</td><td>${comment}</td><td>${dateTime}</td>`;

  const updateTable = (xhr) => {
    if (xhr.status !== 200) {
      alert('Cannot display comments');
      return;
    }
    const comments = JSON.parse(xhr.response);
    const tableBodyElement = document.querySelector('#comments');

    while (tableBodyElement.firstChild) {
      tableBodyElement.removeChild(tableBodyElement.firstChild);
    }

    comments.forEach((comment) => {
      const trElement = document.createElement('tr');
      trElement.innerHTML = createTrContent(comment);
      tableBodyElement.appendChild(trElement);
    });
  };

  const parseFormData = (formData) => {
    const parsedFormData = [];
    for (const [field, value] of formData) {
      const paramString = field + '=' + value;
      parsedFormData.push(paramString);
    }
    return parsedFormData;
  };

  const performXHR = (method, url, callback, body = '') => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', (event) => callback(xhr));
    xhr.open(method, url);
    xhr.send(body);
  };

  const handleAddCommentRes = (xhr) => {
    if (xhr.status !== 200) {
      alert('Comment not added');
      return;
    }
    performXHR('GET', '/api/guest-book', updateTable);
  };

  const sendAddCommentReq = (event) => {
    const formElement = document.querySelector('form');
    const formData = new FormData(formElement);
    const body = parseFormData(formData).join('&');

    performXHR('POST', '/guest-book/add-comment', handleAddCommentRes, body);
    formElement.reset();
  };

  const main = () => {
    const buttonElement = document.querySelector('#submit');
    buttonElement.addEventListener('click', sendAddCommentReq);
  };

  window.onload = main;
})();

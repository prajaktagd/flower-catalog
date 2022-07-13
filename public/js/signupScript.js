(function () {
  const innerHtml = () => 'Registered Successfully&nbsp<a href="/login">Login</a>';

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

  const displayMessage = (xhr) => {
    if (xhr.status !== 200) {
      alert('User credentials not provided');
      return;
    }
    const messageElement = document.querySelector('#message');
    messageElement.innerHTML = innerHtml();
  };

  const sendRegisterUserReq = (event) => {
    const formElement = document.querySelector('form');
    const formData = new FormData(formElement);
    const body = parseFormData(formData).join('&');

    performXHR('POST', '/signup', displayMessage, body);
    formElement.reset();
  };

  const main = () => {
    const buttonElement = document.querySelector('#submit');
    buttonElement.addEventListener('click', sendRegisterUserReq);
  };

  window.onload = main;
})()
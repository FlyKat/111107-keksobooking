'use strict';

(function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';
  var SERVER_URL_DATA = SERVER_URL + '/data';
  var TIMEOUT_INTERVAL = 10000;

  function setup(loadHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          loadHandler(xhr.response);
          break;
        case 404:
          errorHandler('Страница не найдена');
          break;
        case 500:
          errorHandler('Внутренняя ошибка сервера');
          break;
        default:
          errorHandler('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });


    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_INTERVAL;

    return xhr;
  }


  function save(data, loadHandler, errorHandler) {
    var xhr = setup(loadHandler, errorHandler);

    xhr.open('POST', SERVER_URL);
    xhr.send(data);
  }

  function load(loadHandler, errorHandler) {
    var xhr = setup(loadHandler, errorHandler);

    xhr.open('GET', SERVER_URL_DATA);
    xhr.send();
  }

  function showError(errorMessage) {
    var node = document.createElement('div');

    node.style.zIndex = '100';
    node.style.position = 'fixed';
    node.style.top = '50%';
    node.style.width = '100%';
    node.style.fontSize = '30px';
    node.style.textAlign = 'center';
    node.style.color = '#fff';
    node.style.backgroundColor = '#fb0c18';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  window.backend = {
    save: save,
    load: load,
    showError: showError
  };
})();

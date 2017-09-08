'use strict';

(function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';

  function setup(loadHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          loadHandler(xhr.response);
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

    xhr.timeout = 10000;

    return xhr;
  }


  function save(data, loadHandler, errorHandler) {
    var xhr = setup(loadHandler, errorHandler);

    xhr.open('POST', SERVER_URL);
    xhr.send(data);
  }

  function load(loadHandler, errorHandler) {
    var xhr = setup(loadHandler, errorHandler);

    xhr.open('GET', SERVER_URL + '/data');
    xhr.send();
  }

  window.backend = {
    save: save,
    load: load
  };
})();

'use strict';

(function () {
  var noticeForm = document.querySelector('.notice__form');
  var title = noticeForm.querySelector('#title');
  var address = noticeForm.querySelector('#address');
  var timein = noticeForm.querySelector('#timein');
  var timeout = noticeForm.querySelector('#timeout');
  var type = noticeForm.querySelector('#type');
  var price = noticeForm.querySelector('#price');
  var roomNumber = noticeForm.querySelector('#room_number');
  var capacity = noticeForm.querySelector('#capacity');
  var formSubmit = noticeForm.querySelector('.form__submit');

  function timeinChangeHandler() {
    timeout.value = timein.value;
  }

  function timeoutChangeHandler() {
    timein.value = timeout.value;
  }

  function typePriceChangeHandler() {
    if (type.value === 'flat') {
      price.min = 1000;
    } else if (type.value === 'bungalo') {
      price.min = 0;
    } else if (type.value === 'house') {
      price.min = 5000;
    } else if (type.value === 'palace') {
      price.min = 10000;
    }
    price.value = price.min;
  }

  function roomNumberCapacityChangeHandler() {
    for (var i = 0; i < capacity.options.length; i++) {
      capacity.options[i].disabled = false;
    }

    if (roomNumber.value === '1') {
      capacity.value = '1';
      capacity.options[0].disabled = true;
      capacity.options[1].disabled = true;
      capacity.options[3].disabled = true;
    } else if (roomNumber.value === '2') {
      capacity.value = '2';
      capacity.options[0].disabled = true;
      capacity.options[3].disabled = true;
    } else if (roomNumber.value === '3') {
      capacity.value = '3';
      capacity.options[3].disabled = true;
    } else if (roomNumber.value === '100') {
      capacity.value = '0';
      capacity.options[0].disabled = true;
      capacity.options[1].disabled = true;
      capacity.options[2].disabled = true;
    }
  }

  function checkFieldValidity(field) {
    if (field.checkValidity() === false) {
      field.style.border = '1px solid red';
    }
  }

  function checkValidity() {
    checkFieldValidity(title);
    checkFieldValidity(address);
    checkFieldValidity(price);
  }

  timein.addEventListener('change', timeinChangeHandler);
  timeout.addEventListener('change', timeoutChangeHandler);
  type.addEventListener('change', typePriceChangeHandler);
  roomNumber.addEventListener('change', roomNumberCapacityChangeHandler);
  formSubmit.addEventListener('click', checkValidity);
})();

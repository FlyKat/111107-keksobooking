'use strict';

(function () {
  var FORM_VALUES = {
    times: [
      '12:00',
      '13:00',
      '14:00'
    ],
    types: [
      'flat',
      'bungalo',
      'house',
      'palace'
    ],
    prices: [
      1000,
      0,
      5000,
      10000
    ],
    roomNumbers: [
      '1',
      '2',
      '3',
      '100'
    ],
    capacities: [
      ['1'],
      ['2', '1'],
      ['3', '2', '1'],
      ['0']
    ]
  };

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

  function init() {
    syncWithOptions(capacity, FORM_VALUES.capacities[0]);
  }

  function syncValues(field, value) {
    field.value = value;
  }

  function syncValueWithMin(field, value) {
    field.min = value;
    syncValues(field, value);
  }

  function syncWithOptions(field, values) {
    for (var i = 0; i < field.options.length; i++) {
      (values.indexOf(field.options[i].value) === -1) ? field.options[i].disabled = true : field.options[i].disabled = false; //почему ругается тревис?
      field.value = values[0];
    }
  }

  function timeinChangeHandler(evt) {
    window.synchronizeFields(evt.target, timeout, FORM_VALUES.times, FORM_VALUES.times, syncValues);
  }

  function timeoutChangeHandler(evt) {
    window.synchronizeFields(evt.target, timein, FORM_VALUES.times, FORM_VALUES.times, syncValues);
  }

  function typePriceChangeHandler(evt) {
    window.synchronizeFields(evt.target, price, FORM_VALUES.types, FORM_VALUES.prices, syncValueWithMin);
  }

  function roomNumberCapacityChangeHandler(evt) {
    window.synchronizeFields(evt.target, capacity, FORM_VALUES.roomNumbers, FORM_VALUES.capacities, syncWithOptions);
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

  init();

  timein.addEventListener('change', timeinChangeHandler);
  timeout.addEventListener('change', timeoutChangeHandler);
  type.addEventListener('change', typePriceChangeHandler);
  roomNumber.addEventListener('change', roomNumberCapacityChangeHandler);
  formSubmit.addEventListener('click', checkValidity);
})();

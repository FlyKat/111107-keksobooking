'use strict';

(function () {
  var TIMES = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var TYPES = [
    'flat',
    'bungalo',
    'house',
    'palace'
  ];

  var PRICES = [
    1000,
    0,
    10000,
    10000
  ];

  var ROOMS_NUMBER = [
    '1',
    '2',
    '3',
    '100'
  ];

  var CAPACITIES = [
    ['1'],
    ['2', '1'],
    ['3', '2', '1'],
    ['0']
  ];

  var FLAT_PRICE_MIN = 1000;


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
    syncWithOptions(capacity, CAPACITIES[0]);
    price.min = FLAT_PRICE_MIN;
    window.map.setAddressValue(address);
    address.readOnly = true;
  }

  function syncValues(field, value) {
    field.value = value;
  }

  function syncValueWithMin(field, value) {
    field.min = value;
    syncValues(field, value);
  }

  function syncWithOptions(field, values) {
    var optionsArray = Array.prototype.slice.call(field.options);

    optionsArray.forEach(function (item, index) {
      field.options[index].disabled = (values.indexOf(item.value) === -1);
      field.value = values[0];
    });
  }

  function timeinChangeHandler(evt) {
    window.synchronizeFields(evt.target, timeout, TIMES, TIMES, syncValues);
  }

  function timeoutChangeHandler(evt) {
    window.synchronizeFields(evt.target, timein, TIMES, TIMES, syncValues);
  }

  function typePriceChangeHandler(evt) {
    window.synchronizeFields(evt.target, price, TYPES, PRICES, syncValueWithMin);
  }

  function roomNumberCapacityChangeHandler(evt) {
    window.synchronizeFields(evt.target, capacity, ROOMS_NUMBER, CAPACITIES, syncWithOptions);
  }

  function checkIsFieldValid(field) {
    field.style.border = (field.checkValidity() === false) ?
      '1px solid red' : '';
  }

  function formCheckValidityHandler() {
    checkIsFieldValid(title);
    checkIsFieldValid(address);
    checkIsFieldValid(price);
  }

  function resetNoticeForm() {
    noticeForm.reset();
    window.map.setAddressValue(address);
  }

  function noticeFormSendDataHandler(evt) {
    evt.preventDefault();
    window.backend.save(new FormData(noticeForm), resetNoticeForm);
  }

  init();

  timein.addEventListener('change', timeinChangeHandler);
  timeout.addEventListener('change', timeoutChangeHandler);
  type.addEventListener('change', typePriceChangeHandler);
  roomNumber.addEventListener('change', roomNumberCapacityChangeHandler);
  formSubmit.addEventListener('click', formCheckValidityHandler);
  noticeForm.addEventListener('submit', noticeFormSendDataHandler);
})();

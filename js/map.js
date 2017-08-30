'use strict';

var TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var TYPES = [
  'flat',
  'house',
  'bungalo'
];

var TYPES_CIRILLIC = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var TIMES = [
  '12:00',
  '13:00',
  '14:00'
];

var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var AVATARS_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8];

var ADS_COUNT = 8;

var PRICE = {
  min: 1000,
  max: 1000000
};

var ROOMS = {
  min: 1,
  max: 5
};

var GUESTS = {
  min: 1,
  max: 10
};

var LOCATION = {
  x: [300, 900],
  y: [100, 500]
};

var KEYCODS = {
  esc: 27,
  enter: 13
};

/**
 * Возвращает случайный номер в заданном диапазоне (включая max)
 * @param  {[number]} min
 * @param  {[number]} max [
 * @return {[number]}
 */
function getRandomIntInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Возвращает случайный элемент массива
 * @param  {[array]} arr
 * @return {[type]}
 */
function getRandomElement(arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  var element = arr[randomIndex];

  return element;
}

/**
 * Возвращает массив, перетасованный по алгоритму Фишера–Йейтса в варианте Дуршенфельда
 * @param  {[array]} arr
 * @return {[array]}
 */
function shuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var rand = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[rand];
    arr[rand] = temp;
  }

  return arr;
}

/**
 *Возвращает массив объявлений
 * @return {[array]}
 */
function getAds() {
  var ads = [];
  var avatarsNumbers = shuffle(AVATARS_NUMBERS);
  var titles = shuffle(TITLES);


  for (var i = 0; i < ADS_COUNT; i++) {
    var locationX = getRandomIntInRange(LOCATION.x[0], LOCATION.x[1]);
    var locationY = getRandomIntInRange(LOCATION.y[0], LOCATION.y[1]);
    var features = shuffle(FEATURES).slice(0, getRandomIntInRange(1, FEATURES.length));

    ads.push({
      author: {
        avatar: 'img/avatars/user0' + avatarsNumbers[i] + '.png'
      },

      offer: {
        title: titles[i],
        address: locationX + ', ' + locationY,
        price: getRandomIntInRange(PRICE.min, PRICE.max),
        type: getRandomElement(TYPES),
        rooms: getRandomIntInRange(ROOMS.min, ROOMS.max),
        guests: getRandomIntInRange(GUESTS.min, GUESTS.max),
        checkin: getRandomElement(TIMES),
        checkout: getRandomElement(TIMES),
        features: features,
        description: '',
        photos: []
      },

      location: {
        x: locationX,
        y: locationY
      }
    });
  }

  return ads;
}

/**
 * Создает пин
 * @param  {[obj]} ad
 * @return {[type]} DOM-элемент
 */
function getPin(ad) {
  var pin = document.createElement('div');
  var pinImg = document.createElement('img');
  var pinWidth = 56;
  var pinHeight = 75;

  pin.className = 'pin';
  pin.style.left = ad.location.x - pinWidth / 2 + 'px';
  pin.style.top = ad.location.y - pinHeight + 'px';
  pin.tabIndex = 0;

  pinImg.className = 'rounded';
  pinImg.width = 40;
  pinImg.height = 40;
  pinImg.src = ad.author.avatar;

  pin.appendChild(pinImg);

  return pin;
}


/**
 * Cоздает пины в DOM
 * @param  {[array]} ads
 */
function renderPins(ads) {
  var fragment = document.createDocumentFragment();

  ads.forEach(function (ad) {
    fragment.appendChild(getPin(ad));
  });

  pinMap.appendChild(fragment);
}

/**
 *На основе шаблона и данных из массива создает объявление
 * @param  {[object]} ad
 * @return {[type]} DOM-элемент
 */
function getAdCard(ad) {
  var adCard = lodgeTemplate.querySelector('.dialog__panel').cloneNode(true);

  adCard.querySelector('.lodge__title').textContent = ad.offer.title;
  adCard.querySelector('.lodge__address').textContent = ad.offer.address;
  adCard.querySelector('.lodge__price').textContent = ad.offer.price + '\u20bd/ночь';
  adCard.querySelector('.lodge__type').textContent = TYPES_CIRILLIC[ad.offer.type];

  adCard.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + ad.offer.guests + ' гостей в ' + ad.offer.rooms + ' комнатах';
  adCard.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

  ad.offer.features.forEach(function (feature) {
    var element = document.createElement('span');
    element.className = 'feature__image feature__image--' + feature;
    adCard.querySelector('.lodge__features').appendChild(element);
  });

  adCard.querySelector('.lodge__description').textContent = ad.offer.description;


  return adCard;
}

var lodgeTemplate = document.querySelector('#lodge-template').content;
var pinMap = document.querySelector('.tokyo__pin-map');
var dialog = document.querySelector('.dialog');
var dialogClose = dialog.querySelector('.dialog__close');
var avatar = dialog.querySelector('.dialog__title');
var avatarImg = avatar.querySelector('img');


var ads = getAds();
renderPins(ads);

function removeClass(element, nameOfClass) {
  element.classList.remove(nameOfClass);
}

function addClass(element, nameOfClass) {
  element.classList.add(nameOfClass);
}

function popupEscPressHandler(evt) {
  if (evt.keyCode === KEYCODS.esc) {
    addClass(dialog, 'hidden');
    deactivatePin();
  }
}

function openPopup() {
  removeClass(dialog, 'hidden');
  document.addEventListener('keydown', popupEscPressHandler);
}

function closePopup() {
  addClass(dialog, 'hidden');
  document.removeEventListener('keydown', popupEscPressHandler);
}

function deactivatePin() {
  var pinActive = pinMap.querySelector('.pin--active');

  if (pinActive) {
    removeClass(pinActive, 'pin--active');
  }
}

function getAdIndex(path) {
  for (var i = 0; i < ads.length; i++) {
    if (path === ads[i].author.avatar) {
      return i;
    }
  }
  return i;
}

function renderAdCard(index) {
  var dialogPanel = dialog.querySelector('.dialog__panel');
  dialog.replaceChild(getAdCard(ads[index]), dialogPanel);
}

function renderAdCardAvatar(index) {
  avatarImg.src = ads[index].author.avatar;
}

closePopup();

function showDialog(evt) {
  var pinMain = pinMap.querySelector('.pin__main');

  if (evt.target === pinMain || evt.target.parentNode === pinMain) {
    return;
  }

  var pin;
  var pinImg;

  if (evt.target.classList.contains('pin')) {
    pin = evt.target;
    pinImg = evt.target.firstChild;
  } else {
    pin = evt.target.parentNode;
    pinImg = evt.target;
  }

  var src = pinImg.getAttribute('src');
  var index = getAdIndex(src);

  deactivatePin();
  addClass(pin, 'pin--active');
  renderAdCard(index);
  renderAdCardAvatar(index);
  openPopup();
}

function pinMapClickHandler(evt) {
  showDialog(evt);
}

function pinMapPressHandler(evt) {
  if (evt.keyCode === KEYCODS.enter) {
    showDialog(evt);
  }
}

function closeDialogClickHandler() {
  closePopup();
  deactivatePin();
}

function closeDialogPressHandler(evt) {
  if (evt.keyCode === KEYCODS.enter) {
    closePopup();
    deactivatePin();
  }
}

pinMap.addEventListener('click', pinMapClickHandler);
pinMap.addEventListener('keydown', pinMapPressHandler);
dialogClose.addEventListener('click', closeDialogClickHandler);
dialogClose.addEventListener('keydown', closeDialogPressHandler);


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

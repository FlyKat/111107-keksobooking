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
  var features = shuffle(FEATURES).slice(0, getRandomIntInRange(1, FEATURES.length));

  for (var i = 0; i < ADS_COUNT; i++) {
    var locationX = getRandomIntInRange(LOCATION.x[0], LOCATION.x[1]);
    var locationY = getRandomIntInRange(LOCATION.y[0], LOCATION.y[1]);


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

  pinImg.className = 'rounded';
  pinImg.width = 40;
  pinImg.height = 40;
  pinImg.src = ad.author.avatar;
  pinImg.tabIndex = 0;

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
function renderAdCard(ad) {
  var adCardElement = lodgeTemplate.querySelector('.dialog__panel').cloneNode(true);

  adCardElement.querySelector('.lodge__title').textContent = ad.offer.title;
  adCardElement.querySelector('.lodge__address').textContent = ad.offer.address;
  adCardElement.querySelector('.lodge__price').textContent = ad.offer.price + '\u20bd/ночь';
  adCardElement.querySelector('.lodge__type').textContent = TYPES_CIRILLIC[ad.offer.type];

  adCardElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + ad.offer.guests + ' гостей в ' + ad.offer.rooms + ' комнатах';
  adCardElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

  ad.offer.features.forEach(function (feature) {
    var element = document.createElement('span');
    element.className = 'feature__image feature__image--' + feature;
    adCardElement.querySelector('.lodge__features').appendChild(element);
  });

  adCardElement.querySelector('.lodge__description').textContent = ad.offer.description;

  avatarImg.src = ad.author.avatar;

  return adCardElement;
}

var lodgeTemplate = document.querySelector('#lodge-template').content;
var pinMap = document.querySelector('.tokyo__pin-map');
var dialog = document.querySelector('.dialog');
var dialogPanel = dialog.querySelector('.dialog__panel');
var dialogClose = dialog.querySelector('.dialog__close');
var avatar = dialog.querySelector('.dialog__title');
var avatarImg = avatar.querySelector('img');

var KEYCODS = {
  esc: 27,
  enter: 13
};


var ads = getAds();
renderPins(ads);
var pins = pinMap.querySelectorAll('.pin');

function removeClass(element, nameOfClass) {
  element.classList.remove(nameOfClass);
}

function addClass(element, nameOfClass) {
  element.classList.add(nameOfClass);
}

function getSrc(element) {
  avatarImg.src = element.src;
}


function popupEscPressHandler(evt) {
  if (evt.keyCode === KEYCODS.esc) {
    addClass(dialog, 'hidden');
    deactivatePins(pins);
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

function deactivatePins(pins) {
  pins.forEach(function (pin) {
    removeClass(pin, 'pin--active');
  });
}

closePopup();

pinMap.addEventListener('click', function (evt) {
  var target = evt.target;

  if (target.className !== 'pin pin__main' && target.parentNode.className !== 'pin pin__main') {
    deactivatePins(pins);
  }

  if (target.className === 'pin' && target.className !== 'pin__main') {
    addClass(target, 'pin--active');
    getSrc(target.firstChild);
    openPopup();
  }

  if (target.localName === 'img' && target.parentNode.className !== 'pin pin__main') {
    addClass(target.parentNode, 'pin--active');
    getSrc(target);
    openPopup();
  }
});

pinMap.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEYCODS.enter) {
    openPopup();
  }
});

dialogClose.addEventListener('click', function () {
  closePopup();
  deactivatePins(pins);
});

dialogClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEYCODS.enter) {
    closePopup();
    deactivatePins(pins);
  }
});

dialog.replaceChild(renderAdCard(ads[0]), dialogPanel);

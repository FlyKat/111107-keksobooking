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

var RENT_OFFERS_COUNT = 8;

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
function getRentOffers() {
  var rentOffers = [];
  var avatarsNumbers = shuffle(AVATARS_NUMBERS);
  var titles = shuffle(TITLES);
  var features = shuffle(FEATURES).slice(0, getRandomIntInRange(1, FEATURES.length));

  for (var i = 0; i < RENT_OFFERS_COUNT; i++) {
    var locationX = getRandomIntInRange(LOCATION.x[0], LOCATION.x[1]);
    var locationY = getRandomIntInRange(LOCATION.y[0], LOCATION.y[1]);


    rentOffers.push({
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

  return rentOffers;
}

/**
 * Создает пин
 * @param  {[obj]} rentOffer
 * @return {[type]} DOM-элемент
 */
function getPin(rentOffer) {
  var pin = document.createElement('div');
  var pinImg = document.createElement('img');
  var pinWidth = 56;
  var pinHeight = 75;

  pin.className = 'pin';
  pin.style.left = rentOffer.location.x - pinWidth / 2 + 'px';
  pin.style.top = rentOffer.location.y - pinHeight + 'px';

  pinImg.className = 'rounded';
  pinImg.width = 40;
  pinImg.height = 40;
  pinImg.src = rentOffer.author.avatar;

  pin.appendChild(pinImg);

  return pin;
}


/**
 * Cоздает пины в DOM
 * @param  {[array]} rentOffers
 */
function renderPins(rentOffers) {
  var fragment = document.createDocumentFragment();

  rentOffers.forEach(function (rentOffer) {
    fragment.appendChild(getPin(rentOffer));
  });

  pinMap.appendChild(fragment);
}

/**
 *На основе шаблона и данных из массива создает объявление
 * @param  {[object]} rentOffer
 * @return {[type]} DOM-элемент
 */
function renderRentOffer(rentOffer) {
  var lodgeElement = rentOfferTemplate.querySelector('.dialog__panel').cloneNode(true);

  lodgeElement.querySelector('.lodge__title').textContent = rentOffer.offer.title;
  lodgeElement.querySelector('.lodge__address').textContent = rentOffer.offer.address;
  lodgeElement.querySelector('.lodge__price').textContent = rentOffer.offer.price + '\u20bd/ночь';
  lodgeElement.querySelector('.lodge__type').textContent = TYPES_CIRILLIC[rentOffer.offer.type];

  lodgeElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + rentOffer.offer.guests + ' гостей в ' + rentOffer.offer.rooms + ' комнатах';
  lodgeElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + rentOffer.offer.checkin + ', выезд до ' + rentOffer.offer.checkout;

  rentOffer.offer.features.forEach(function (feature) {
    var element = document.createElement('span');
    element.className = 'feature__image feature__image--' + feature;
    lodgeElement.querySelector('.lodge__features').appendChild(element);
  });

  lodgeElement.querySelector('.lodge__description').textContent = rentOffer.offer.description;

  avatarImg.src = rentOffer.author.avatar;

  return lodgeElement;
}

var rentOfferTemplate = document.querySelector('#lodge-template').content;
var pinMap = document.querySelector('.tokyo__pin-map');
//var pinElement= pinMap.querySelectorAll('.pin');
var dialog = document.querySelector('.dialog');
var dialogPanel = dialog.querySelector('.dialog__panel');
var dialogClose = dialog.querySelector('dialog__close');
var avatar = dialog.querySelector('.dialog__title');
var avatarImg = avatar.querySelector('img');

var KEYCODS = {
  esc: 27,
  enter: 13
}


function activatePin() {
  if (!pinElement.classList.contains('pin--active')) {
    pinElement.classList.add('pin--active');
  } else {
    pinElement.remove('pin--active');
  }
}


var rentOffers = getRentOffers();
renderPins(rentOffers);
dialog.replaceChild(renderRentOffer(rentOffers[0]), dialogPanel);


pinMap.addEventListener('click', function (evt) {
  var target = evt.target;
  var pins = pinMap.querySelectorAll('.pin');

  pins.forEach(function (pin) {
    pin.classList.remove('pin--active');
  });

  if (target.className === 'pin') {
    target.classList.add('pin--active');
    avatarImg.src = target.firstChild.getAttribute('src');
  }

  if (target.localName === 'img') {
    target.parentNode.classList.add('pin--active');
    avatarImg.src = target.src;
   }
});


//(.pin:not(:first-child)');

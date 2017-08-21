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
  var features = shuffle(FEATURES);

  for (var i = 0; i < RENT_OFFERS_COUNT; i++) {
    rentOffers[i] = {};

    rentOffers[i].author = {};
    rentOffers[i].author = 'img/avatars/user0' + avatarsNumbers[i] + '.png';

    rentOffers[i].location = {};
    rentOffers[i].location.x = getRandomIntInRange(300, 900);
    rentOffers[i].location.y = getRandomIntInRange(100, 500);

    rentOffers[i].offer = {};
    rentOffers[i].offer.title = titles[i];
    rentOffers[i].offer.address = rentOffers[i].location.x + ', ' + rentOffers[i].location.y;
    rentOffers[i].offer.price = getRandomIntInRange(1000, 1000000);
    rentOffers[i].offer.type = getRandomElement(TYPES);
    rentOffers[i].offer.rooms = getRandomIntInRange(1, 5);
    rentOffers[i].offer.guests = getRandomIntInRange(1, 5);
    rentOffers[i].offer.checkin = getRandomElement(TIMES);
    rentOffers[i].offer.checkout = getRandomElement(TIMES);
    rentOffers[i].offer.features = features;
    rentOffers[i].offer.description = '';
    rentOffers[i].offer.photos = [];
  }

  return rentOffers;
}

getRentOffers();


/* for (var i = 0; i < rentOffersCount; i++) {
  rentOffers[i] = {
    author: {
      avatar: 'img/avatars/user0' + avatarsNumbers[i] + '.png'
    },
    offer: {
      title: titles[i],
      address: rentOffers.location.x + ', ' + rentOffers.location.y,
      price: getRandomIntInRange(1000, 1000000),
      type: getRandomElement(TYPES),
      rooms: getRandomIntInRange(1, 5),
      guests: getRandomIntInRange(1, 5),
      checkin: getRandomElement(TIMES),
      checkout: getRandomElement(TIMES),
      features: [],
      description: '',
      photos: []
    },
    location: {
      x: getRandomIntInRange(300, 900),
      y: getRandomIntInRange(100, 500)
    }
  };
}*/

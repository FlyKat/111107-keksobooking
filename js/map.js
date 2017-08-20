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

var adsCount = 8;

function getRandomIntInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function shuffle(arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var rand = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[rand];
    arr[rand] = temp;
  }

  return arr;
}

var ads = [];

var titles = shuffle(TITLES);
var features = shuffle(FEATURES);
var avatarsNumbers = shuffle(AVATARS_NUMBERS);

for (var i = 0; i < adsCount; i++) {
  ads[i] = {
    author: {
      avatar: 'img/avatars/user0' + avatarsNumbers[i] + '.png'
    },
    offer: {
      title: titles[i],
      address: '',
      price: getRandomIntInRange(1000, 1000000),
      type: TYPES[i],
      rooms: getRandomIntInRange(1, 5),
      guests: '',
      checkin: TIMES[i],
      checkout: TIMES[i],
      features: [],
      description: '',
      photos: []
    },
    location: {
       x: getRandomIntInRange(300, 900),
       y: getRandomIntInRange(100, 500)
    }
  };
}

'use strict';

(function () {
  /** var TITLES = [
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
  *Возвращает массив объявлений
  * @return {array}
  */
  /** function getAds() {
    var ads = [];
    var shuffle = window.util.shuffle;
    var getRandomIntInRange = window.util.getRandomIntInRange;
    var getRandomElement = window.util.getRandomElement;
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
  } **/

  window.data = {
    ads: [],
  };
})();

'use strict';

(function () {
  var TYPES_CIRILLIC = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var dialog = document.querySelector('.dialog');

  /**
   * @param  {object} advert
   * @return {HTMLElement} advertCard
   */
  function createAdvertCard(advert) {
    var lodgeTemplate = document.querySelector('#lodge-template').content;
    var advertCard = lodgeTemplate.querySelector('.dialog__panel').cloneNode(true);

    advertCard.querySelector('.lodge__title').textContent = advert.offer.title;
    advertCard.querySelector('.lodge__address').textContent = advert.offer.address;
    advertCard.querySelector('.lodge__price').textContent = advert.offer.price + '\u20bd/ночь';
    advertCard.querySelector('.lodge__type').textContent = TYPES_CIRILLIC[advert.offer.type];

    advertCard.querySelector('.lodge__rooms-and-guests').textContent = 'Для '
      + advert.offer.guests + ' гостей в ' + advert.offer.rooms + ' комнатах';
    advertCard.querySelector('.lodge__checkin-time').textContent = 'Заезд после '
      + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;

    var lodgeFeatures = advertCard.querySelector('.lodge__features');

    advert.offer.features.forEach(function (feature) {
      var span = document.createElement('span');
      span.className = 'feature__image feature__image--' + feature;
      lodgeFeatures.appendChild(span);
    });

    advertCard.querySelector('.lodge__description').textContent = advert.offer.description;

    var lodgePhotos = advertCard.querySelector('.lodge__photos');

    advert.offer.photos.forEach(function (photo) {
      var img = document.createElement('img');
      img.src = photo;
      img.width = '55';
      img.height = '45';
      lodgePhotos.appendChild(img);
    });

    var avatar = dialog.querySelector('.dialog__title');
    var avatarImg = avatar.querySelector('img');
    avatarImg.src = advert.author.avatar;

    return advertCard;
  }

  function renderAdvertCard(obj) {
    var dialogPanel = dialog.querySelector('.dialog__panel');

    dialog.replaceChild(createAdvertCard(obj), dialogPanel);
  }

  window.card = {
    renderAdvertCard: renderAdvertCard
  };
})();

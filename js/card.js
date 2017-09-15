'use strict';

(function () {
  var TYPES_CIRILLIC = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var dialog = document.querySelector('.dialog');

  /**
   * @param  {object} ad
   * @return {HTMLElement} adCard
   */
  function createAdCard(ad) {
    var lodgeTemplate = document.querySelector('#lodge-template').content;
    var adCard = lodgeTemplate.querySelector('.dialog__panel').cloneNode(true);

    adCard.querySelector('.lodge__title').textContent = ad.offer.title;
    adCard.querySelector('.lodge__address').textContent = ad.offer.address;
    adCard.querySelector('.lodge__price').textContent = ad.offer.price + '\u20bd/ночь';
    adCard.querySelector('.lodge__type').textContent = TYPES_CIRILLIC[ad.offer.type];

    adCard.querySelector('.lodge__rooms-and-guests').textContent = 'Для '
      + ad.offer.guests + ' гостей в ' + ad.offer.rooms + ' комнатах';
    adCard.querySelector('.lodge__checkin-time').textContent = 'Заезд после '
      + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

    ad.offer.features.forEach(function (feature) {
      var span = document.createElement('span');
      span.className = 'feature__image feature__image--' + feature;
      adCard.querySelector('.lodge__features').appendChild(span);
    });

    adCard.querySelector('.lodge__description').textContent = ad.offer.description;

    ad.offer.photos.forEach(function (photo) {
      var img = document.createElement('img');
      img.src = photo;
      img.width = '55';
      img.height = '45';
      adCard.querySelector('.lodge__photos').appendChild(img);
    });

    var avatar = dialog.querySelector('.dialog__title');
    var avatarImg = avatar.querySelector('img');
    avatarImg.src = ad.author.avatar;

    return adCard;
  }

  function renderAdCard(obj) {
    var dialogPanel = dialog.querySelector('.dialog__panel');

    dialog.replaceChild(createAdCard(obj), dialogPanel);
  }

  window.card = {
    renderAdCard: renderAdCard
  };
})();

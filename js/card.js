'use strict';

(function () {
  var TYPES_CIRILLIC = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var dialog = document.querySelector('.dialog');
  var ads = window.data.ads;

  /**
   *На основе шаблона и данных из массива создает объявление
   * @param  {[object]} ad
   * @return {[type]} DOM-элемент
   */
  function getAdCard(ad) {
    var lodgeTemplate = document.querySelector('#lodge-template').content;
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

  function renderAdCard(index) {
    var dialogPanel = dialog.querySelector('.dialog__panel');

    dialog.replaceChild(getAdCard(ads[index]), dialogPanel);
  }

  function renderAdCardAvatar(index) {
    var avatar = dialog.querySelector('.dialog__title');
    var avatarImg = avatar.querySelector('img');

    avatarImg.src = ads[index].author.avatar;
  }

  window.card = {
    renderAdCard: renderAdCard,
    renderAdCardAvatar: renderAdCardAvatar,
  };
})();

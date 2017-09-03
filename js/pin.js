'use strict';

(function () {
  var PIN = {
    width: 56,
    height: 75
  };

  var pinMap = document.querySelector('.tokyo__pin-map');

  /**
   * Создает пин
   * @param  {[obj]} ad
   * @return {[type]} DOM-элемент
   */
  function getPin(ad) {
    var pin = document.createElement('div');
    var pinImg = document.createElement('img');

    pin.className = 'pin';
    pin.style.left = ad.location.x - PIN.width / 2 + 'px';
    pin.style.top = ad.location.y - PIN.height + 'px';
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
  * @param  {array} ads
   */
  function renderPins(ads) {
    var fragment = document.createDocumentFragment();

    ads.forEach(function (ad) {
      fragment.appendChild(getPin(ad));
    });

    pinMap.appendChild(fragment);
  }

  window.pin = {
    renderPins: renderPins,
    pinMap: pinMap
  };
})();

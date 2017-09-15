'use strict';

(function () {
  /**
   * @enum {number}]
  */
  var Pin = {
    WIDTH: 56,
    HEIGHT: 75
  };

  /**
   * @param  {odject} ad
   * @param  {number} i
   * @return {HTMLElement} pin
   */
  function createPin(ad, i) {
    var pin = document.createElement('div');
    var pinImg = document.createElement('img');

    pin.className = 'pin';
    pin.style.left = ad.location.x - Pin.WIDTH / 2 + 'px';
    pin.style.top = ad.location.y - Pin.HEIGHT + 'px';
    pin.tabIndex = 0;
    pin.setAttribute('data-index', i);

    pinImg.className = 'rounded';
    pinImg.width = 40;
    pinImg.height = 40;
    pinImg.src = ad.author.avatar;

    pin.appendChild(pinImg);

    return pin;
  }

  /**
   * @param  {array} data
   */
  function renderPins(data) {
    var pinMap = document.querySelector('.tokyo__pin-map');
    var fragment = document.createDocumentFragment();

    data.forEach(function (obj, i) {
      fragment.appendChild(createPin(obj, i));
    });

    pinMap.appendChild(fragment);
  }

  window.pin = {
    renderPins: renderPins,
  };
})();

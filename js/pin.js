'use strict';

(function () {
  /**
   * @enum {number}]
  */
  var Pin = {
    WIDTH: 56,
    HEIGHT: 75,
    IMG_SIZE: 40
  };

  var pinMap = document.querySelector('.tokyo__pin-map');

  /**
   * @param  {odject} advert
   * @param  {number} i
   * @return {HTMLElement} pin
   */
  function createPin(advert, i) {
    var pin = document.createElement('div');
    var pinImg = document.createElement('img');

    pin.className = 'pin';
    pin.style.left = advert.location.x - Pin.WIDTH / 2 + 'px';
    pin.style.top = advert.location.y - Pin.HEIGHT + 'px';
    pin.tabIndex = 0;
    pin.dataset.index = i;

    pinImg.className = 'rounded';
    pinImg.width = Pin.IMG_SIZE;
    pinImg.height = Pin.IMG_SIZE;
    pinImg.src = advert.author.avatar;

    pin.appendChild(pinImg);

    return pin;
  }

  /**
   * @param  {array} data
   */
  function renderPins(data) {
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

'use strict';

(function () {
  var pinMap = document.querySelector('.tokyo__pin-map');
  var pinMain = pinMap.querySelector('.pin__main');

  function getAdIndex(path) {
    var adsLength = window.data.ads.length;
    for (var i = 0; i < adsLength; i++) {
      if (path === window.data.ads[i].author.avatar) {
        return i;
      }
    }
    return -1;
  }

  function showCard(evt) {
    if (evt.target === pinMain || evt.target.parentNode === pinMain) {
      return;
    }

    var pin;
    var pinImg;

    if (evt.target.classList.contains('pin')) {
      pin = evt.target;
      pinImg = evt.target.firstChild;
    } else {
      pin = evt.target.parentNode;
      pinImg = evt.target;
    }

    var src = pinImg.getAttribute('src');
    var index = getAdIndex(src);

    window.map.deactivatePin();
    window.util.addClass(pin, 'pin--active');
    window.card.renderAdCard(index);
    window.card.renderAdCardAvatar(index);
    window.map.openPopup();
  }

  window.showCard = showCard;
})();

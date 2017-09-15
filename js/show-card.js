'use strict';

(function () {
  function showCard(evt) {
    var pinMap = document.querySelector('.tokyo__pin-map');
    var pinMain = pinMap.querySelector('.pin__main');
    var pin;

    if (evt.target === pinMain || evt.target.parentNode === pinMain) {
      return;
    }

    pin = (evt.target.classList.contains('pin')) ?
      evt.target : evt.target.parentNode;

    var index = pin.getAttribute('data-index');

    window.map.deactivatePin();
    window.util.addClass(pin, 'pin--active');

    if (window.map.adsFiltered) {
      window.card.renderAdCard(window.map.adsFiltered[index]);
    } else {
      window.card.renderAdCard(window.map.ads[index]);
    }

    window.map.openPopup();
  }

  window.showCard = showCard;
})();


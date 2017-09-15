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

    if (window.map.advertsFiltered.length === 0) {
      window.card.renderAdvertCard(window.map.adverts[index]);
    } else {
      window.card.renderAdvertCard(window.map.advertsFiltered[index]);
    }

    window.map.openPopup();
  }

  window.showCard = showCard;
})();


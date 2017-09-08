'use strict';

(function () {
  function showCard(evt) {
    var pinMap = document.querySelector('.tokyo__pin-map');
    var pinMain = pinMap.querySelector('.pin__main');
    var pin;

    if (evt.target === pinMain || evt.target.parentNode === pinMain) {
      return;
    }

    if (evt.target.classList.contains('pin')) {
      pin = evt.target;
    } else {
      pin = evt.target.parentNode;
    }

    var index = pin.getAttribute('data-index');

    window.map.deactivatePin();
    window.util.addClass(pin, 'pin--active');
    window.card.renderAdCard(index);
    window.card.renderAdCardAvatar(index);
    window.map.openPopup();
  }

  window.showCard = showCard;
})();

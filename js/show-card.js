'use strict';

(function () {
  function showCard(evt) {
    var pinMap = document.querySelector('.tokyo__pin-map');
    var pinMain = pinMap.querySelector('.pin__main');
    var pin;
      var pinImg;  // Почему eslint ругается на эту строку?

    if (evt.target === pinMain || evt.target.parentNode === pinMain) {  // можно ли оптимизировать строки 10 - 20 ?
      return;
    }

    if (evt.target.classList.contains('pin')) {
      pin = evt.target;
      pinImg = evt.target.firstChild;
    } else {
      pin = evt.target.parentNode;
      pinImg = evt.target;
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

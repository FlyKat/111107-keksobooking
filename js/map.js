'use strict';

(function () {
  var dialog = window.card.dialog;
  var dialogClose = dialog.querySelector('.dialog__close');
  var pinMap = window.pin.pinMap;
  var ads = window.data.ads;
  var adsLength = ads.length;

  window.pin.renderPins(ads);

  function popupEscPressHandler(evt) {
    window.util.isEscEvent(evt, function () {
      window.util.addClass(dialog, 'hidden');
      deactivatePin();
    });
  }

  function openPopup() {
    window.util.removeClass(dialog, 'hidden');
    document.addEventListener('keydown', popupEscPressHandler);
  }

  function closePopup() {
    window.util.addClass(dialog, 'hidden');
    document.removeEventListener('keydown', popupEscPressHandler);
  }

  function deactivatePin() {
    var pinActive = pinMap.querySelector('.pin--active');

    if (pinActive) {
      window.util.removeClass(pinActive, 'pin--active');
    }
  }

  function getAdIndex(path) {
    for (var i = 0; i < adsLength; i++) {
      if (path === ads[i].author.avatar) {
        return i;
      }
    }
    return i;
  }

  closePopup();

  function showDialog(evt) {
    var pinMain = pinMap.querySelector('.pin__main');

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

    deactivatePin();
    window.util.addClass(pin, 'pin--active');
    window.card.renderAdCard(index);
    window.card.renderAdCardAvatar(index);
    openPopup();
  }

  function pinMapClickHandler(evt) {
    showDialog(evt);
  }

  function pinMapPressHandler(evt) {
    window.util.isEnterEvent(evt, function () {
      showDialog(evt);
    });
  }

  function closeDialogClickHandler() {
    closePopup();
    deactivatePin();
  }

  function closeDialogPressHandler(evt) {
    window.util.isEnterEvent(evt, function () {
      closePopup();
      deactivatePin();
    });
  }

  pinMap.addEventListener('click', pinMapClickHandler);
  pinMap.addEventListener('keydown', pinMapPressHandler);
  dialogClose.addEventListener('click', closeDialogClickHandler);
  dialogClose.addEventListener('keydown', closeDialogPressHandler);
})();

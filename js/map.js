'use strict';

(function () {
  var MAP_MIN_X = 263;
  var MAP_MAX_X = 862;
  var MAP_MIN_Y = 6;
  var MAP_MAX_Y = 406;
  var PIN_MAIN_WIDTH = 76;
  var PIN_MAIN_HEIGHT = 94;
  var dialog = window.card.dialog;
  var dialogClose = dialog.querySelector('.dialog__close');
  var pinMap = window.pin.pinMap;
  var ads = window.data.ads;
  var adsLength = ads.length;
  var pinMain = pinMap.querySelector('.pin__main');

  var noticeForm = document.querySelector('.notice__form');
  var noticeFormAdress = noticeForm.querySelector('#address');

  function init() {
    closePopup();
    window.pin.renderPins(ads);
  }

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

  function showDialog(evt) {
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

  function pinMainMousedownHandler(evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function MouseMoveHandler(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinMainCoords = {
        x: pinMain.offsetLeft - shift.x,
        y: pinMain.offsetTop - shift.y
      };

      if (MAP_MIN_X < pinMainCoords.x && pinMainCoords.x < MAP_MAX_X) {
        pinMain.style.left = pinMainCoords.x + 'px';
      }

      if (MAP_MIN_Y < pinMainCoords.y && pinMainCoords.y < MAP_MAX_Y) {
        pinMain.style.top = pinMainCoords.y + 'px';
      }

      noticeFormAdress.readOnly = true;
      noticeFormAdress.value = 'x: ' + (pinMainCoords.x + PIN_MAIN_WIDTH / 2) + ', y: ' + (pinMainCoords.y + PIN_MAIN_HEIGHT);
    }

    function MouseUpHandler(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', MouseMoveHandler);
      document.removeEventListener('mouseup', MouseUpHandler);
    }

    document.addEventListener('mousemove', MouseMoveHandler);
    document.addEventListener('mouseup', MouseUpHandler);
  }

  init();

  pinMap.addEventListener('click', pinMapClickHandler);
  pinMap.addEventListener('keydown', pinMapPressHandler);
  dialogClose.addEventListener('click', closeDialogClickHandler);
  dialogClose.addEventListener('keydown', closeDialogPressHandler);
  pinMain.addEventListener('mousedown', pinMainMousedownHandler);
})();

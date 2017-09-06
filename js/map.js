'use strict';

(function () {
  var MAP = {
    minX: 0,
    maxX: 1200,
    minY: 100,
    maxY: 550
  };

  var PIN_MAIN = {
    width: 76,
    height: 94
  };

  var dialog = document.querySelector('.dialog');
  var dialogClose = dialog.querySelector('.dialog__close');
  var ads = window.data.ads;
  var pinMap = document.querySelector('.tokyo__pin-map');
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

  function pinMapClickHandler(evt) {
    window.showCard(evt);
  }

  function pinMapPressHandler(evt) {
    window.util.isEnterEvent(evt, function () {
      window.showCard(evt);
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

      if (MAP.minX < pinMainCoords.x && pinMainCoords.x < (MAP.maxX - PIN_MAIN.width)) {
        pinMain.style.left = pinMainCoords.x + 'px';
      }

      if (MAP.minY < pinMainCoords.y && pinMainCoords.y < MAP.maxY) {
        pinMain.style.top = pinMainCoords.y + 'px';
      }

      noticeFormAdress.readOnly = true;
      noticeFormAdress.value = 'x: ' + (pinMainCoords.x + PIN_MAIN.width / 2) + ', y: ' + (pinMainCoords.y + PIN_MAIN.height);
      // noticeFormAdress.value =(pinMainCoords.x + PIN_MAIN.width / 2) + ', ' + (pinMainCoords.y + PIN_MAIN.height);
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

  /**  noticeFormAdress.addEventListener('change', function () {
    var pinMainCoords = noticeFormAdress.value.split(', ');

    if (MAP.minX < pinMainCoords[0] && pinMainCoords[0] < MAP.maxX) {
        pinMain.style.left = (pinMainCoords[0] - PIN_MAIN.width / 2) + 'px';
      }

      if (MAP.minY < pinMainCoords[1] && pinMainCoords[1] < MAP.maxY) {
        pinMain.style.top = (pinMainCoords[1] - PIN_MAIN.height) + 'px';
      }
  }); **/
  window.map = {
    deactivatePin: deactivatePin,
    openPopup: openPopup
  };
})();

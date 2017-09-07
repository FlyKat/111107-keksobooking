'use strict';

(function () {
  var MAP = {
    minX: 0,
    maxX: 1200,
    minY: 100,
    maxY: 550
  };

  var dialog = document.querySelector('.dialog');
  var dialogClose = dialog.querySelector('.dialog__close');
  var pinMap = document.querySelector('.tokyo__pin-map');
  var pinMain = pinMap.querySelector('.pin__main');
  var noticeForm = document.querySelector('.notice__form');
  var noticeFormAdress = noticeForm.querySelector('#address');

  var pinMainShift = {
    x: Math.round(pinMain.offsetWidth / 2),
    y: pinMain.offsetHeight
  };

  function init() {
    closePopup();
    window.backend.load(loadHandler, errorHandler);
  }

  function loadHandler(ads) {
    window.data.ads = ads;
    window.pin.renderPins(ads);
  }

  function errorHandler(errorMessage) {
    var node = document.createElement('div');

    node.style.zIndex = '100';
    node.style.margin = '0 auto';
    node.style.textAlign = 'center';
    node.style.backgroundColor = 'red';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
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

  function setAddressValue(address) {
    address.value = 'x: ' + (pinMain.offsetLeft + pinMainShift.x) + ', ' + 'y: ' + (pinMain.offsetTop + pinMainShift.y);
  }

  function setElementPosition(elem, coords) {
    if (MAP.minX < coords.x && coords.x < (MAP.maxX - pinMain.offsetWidth)) {
      elem.style.left = coords.x + 'px';
    }

    if (MAP.minY < coords.y && coords.y < MAP.maxY) {
      elem.style.top = coords.y + 'px';
    }
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

      setElementPosition(pinMain, pinMainCoords);
      setAddressValue(noticeFormAdress);
    }

    function MouseUpHandler(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', MouseMoveHandler);
      document.removeEventListener('mouseup', MouseUpHandler);
    }

    document.addEventListener('mousemove', MouseMoveHandler);
    document.addEventListener('mouseup', MouseUpHandler);
  }

  function addressChangeHandler() {
    var coords = noticeFormAdress.value.split(', ');
    var coordsX = coords[0].replace('x: ', '');
    var coordsY = coords[1].replace('y: ', '');
    var pinMainCoordsX = coordsX.trim();
    var pinMainCoordsY = coordsY.trim();

    var shift = {
      x: pinMainCoordsX - Math.round(pinMainShift.x),
      y: pinMainCoordsY - pinMainShift.y,
    };

    setElementPosition(pinMain, shift);
    setAddressValue(noticeFormAdress);
  }

  init();

  pinMap.addEventListener('click', pinMapClickHandler);
  pinMap.addEventListener('keydown', pinMapPressHandler);
  dialogClose.addEventListener('click', closeDialogClickHandler);
  dialogClose.addEventListener('keydown', closeDialogPressHandler);
  pinMain.addEventListener('mousedown', pinMainMousedownHandler);
  noticeFormAdress.addEventListener('change', addressChangeHandler);

  window.map = {
    deactivatePin: deactivatePin,
    openPopup: openPopup,
    setAddressValue: setAddressValue
  };
})();

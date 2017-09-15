'use strict';

(function () {
  /**
   * @enum {number}
  */
  var MapBorders = {
    LEFT: 0,
    RIGHT: 1200,
    TOP: 100,
    BOTTOM: 550
  };

  var pinInitAmount = 3;

  var dialog = document.querySelector('.dialog');
  var dialogClose = dialog.querySelector('.dialog__close');
  var pinMap = document.querySelector('.tokyo__pin-map');
  var pinMain = pinMap.querySelector('.pin__main');
  var noticeForm = document.querySelector('.notice__form');
  var noticeFormAdress = noticeForm.querySelector('#address');
  var filtersForm = document.querySelector('.tokyo__filters');

  var pinMainShift = {
    x: Math.round(pinMain.offsetWidth / 2),
    y: pinMain.offsetHeight
  };

  function init() {
    closePopup();
    window.backend.load(loadHandler, window.backend.showError);
  }

  function loadHandler(data) {
    window.map.adverts = data;
    window.pin.renderPins(window.map.adverts.slice(0, pinInitAmount));
  }

  function renderPinsAfterSetFilters() {
    closePopup();

    while (pinMap.children.length !== 1) {
      pinMap.removeChild(pinMap.children[1]);
    }

    window.map.advertsFiltered = window.filter();
    window.pin.renderPins(window.map.advertsFiltered);
  }

  function filterChangeHandler(evt) {
    if (!evt.target.classList.contains('tokyo__filter')
        && evt.target.name !== 'feature') {
      return;
    }

    window.debounce(renderPinsAfterSetFilters);
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

  function closeDialogClickHandler(evt) {
    evt.preventDefault();
    closePopup();
    deactivatePin();
  }

  function closeDialogPressHandler(evt) {
    window.util.isEnterEvent(evt, function () {
      evt.preventDefault();
      closePopup();
      deactivatePin();
    });
  }

  function setAddressValue(address) {
    address.value = 'x: ' + (pinMain.offsetLeft + pinMainShift.x) + ', '
      + 'y: ' + (pinMain.offsetTop + pinMainShift.y);
  }

  function setElementPosition(elem, coords) {
    if (MapBorders.LEFT < coords.x && coords.x
        < (MapBorders.RIGHT - pinMain.offsetWidth)) {
      elem.style.left = coords.x + 'px';
    }

    if (MapBorders.TOP < coords.y && coords.y < MapBorders.BOTTOM) {
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
  filtersForm.addEventListener('change', filterChangeHandler);

  window.map = {
    deactivatePin: deactivatePin,
    openPopup: openPopup,
    setAddressValue: setAddressValue,
    adverts: [],
    advertsFiltered: []
  };
})();

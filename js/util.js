'use strict';

(function () {
  /**
   @enum {number}
   */
  var KeyCode = {
    ESC: 27,
    ENTER: 13
  };

  function isEscEvent(evt, action) {
    if (evt.keyCode === KeyCode.ESC) {
      action();
    }
  }

  function isEnterEvent(evt, action) {
    if (evt.keyCode === KeyCode.ENTER) {
      action();
    }
  }

  /**
  * Возвращает случайный номер в заданном диапазоне (включая max)
  * @param  {number} min
  * @param  {number} max
  * @return {number}
  */
  function getRandomIntInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /**
  * Возвращает случайный элемент массива
  * @param  {array} arr
  * @return {element}
  */
  function getRandomElement(arr) {
    var randomIndex = Math.floor(Math.random() * arr.length);
    var element = arr[randomIndex];

    return element;
  }

  /**
  * Возвращает массив, перетасованный по алгоритму
  * Фишера–Йейтса в варианте Дуршенфельда
  * @param  {array} arr
  * @return {array}
  */
  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var rand = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[rand];
      arr[rand] = temp;
    }

    return arr;
  }

  function removeClass(element, nameOfClass) {
    element.classList.remove(nameOfClass);
  }

  function addClass(element, nameOfClass) {
    element.classList.add(nameOfClass);
  }

  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    getRandomIntInRange: getRandomIntInRange,
    getRandomElement: getRandomElement,
    shuffle: shuffle,
    removeClass: removeClass,
    addClass: addClass
  };
})();

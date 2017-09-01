'use strict';

(function () {
  var KEYCODS = {
    esc: 27,
    enter: 13
  };

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === KEYCODS.esc) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === KEYCODS.enter) {
        action();
      }
    },
    /**
    * Возвращает случайный номер в заданном диапазоне (включая max)
    * @param  {[number]} min
    * @param  {[number]} max [
    * @return {[number]}
    */
    getRandomIntInRange: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    /**
    * Возвращает случайный элемент массива
    * @param  {[array]} arr
    * @return {[type]}
    */
    getRandomElement: function (arr) {
      var randomIndex = Math.floor(Math.random() * arr.length);
      var element = arr[randomIndex];

      return element;
    },
    /**
    * Возвращает массив, перетасованный по алгоритму Фишера–Йейтса в варианте Дуршенфельда
    * @param  {[array]} arr
    * @return {[array]}
    */
    shuffle: function (arr) {
      for (var i = arr.length - 1; i > 0; i--) {
        var rand = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[rand];
        arr[rand] = temp;
      }

      return arr;
    },
    removeClass: function (element, nameOfClass) {
      element.classList.remove(nameOfClass);
    },
    addClass: function (element, nameOfClass) {
      element.classList.add(nameOfClass);
    }
  };
})();

'use strict';

(function () {
  /**
   * @param  {HTMLElement}   field1
   * @param  {HTMLElement}   field2
   * @param  {array}   data1
   * @param  {array}   data2
   * @param  {function} cb
   */
  function synchronizeFields(field1, field2, data1, data2, cb) {
    var indexValue = data1.indexOf(field1.value);
    cb(field2, data2[indexValue]);
  }

  window.synchronizeFields = synchronizeFields;
})();

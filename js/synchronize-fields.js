'use strict';

(function () {
  function synchronizeFields(field1, field2, data1, data2, sync) {
    var indexValue = data1.indexOf(field1.value);
    sync(field2, data2[indexValue]);
  }

  window.synchronizeFields = synchronizeFields;
})();

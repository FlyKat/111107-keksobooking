'use strict';

(function () {
  var filtersForm = document.querySelector('.tokyo__filters');
  var houseType = filtersForm.querySelector('#housing_type');
  var housePrice = filtersForm.querySelector('#housing_price');
  var roomsNumber = filtersForm.querySelector('#housing_room-number');
  var guestsNumber = filtersForm.querySelector('#housing_guests-number');
  var features = filtersForm.querySelectorAll('input[name="feature"]');

  function setFilterValues(filterValue, itemValue) {
    return filterValue === 'any' || itemValue === filterValue;
  }

  function setFilterPrice(price) {
    var currentValue = housePrice.value;

    switch (currentValue) {
      case 'middle':
        return price >= 10000 && price < 50000;
      case 'low':
        return price < 10000;
      case 'high':
        return price >= 50000;
      default:
        return true;
    }
  }

  function setFilterFeatures(filterFeatures, itemFeatures) {
    for (var i = 0; i < filterFeatures.length; i++) {
      if (itemFeatures.indexOf(filterFeatures[i]) === -1) {
        return false;
      }
    }

    return true;
  }


  function setFilters() {
    var houseFeatures = [].filter.call(features, function (item) {
      return item.checked;
    }).map(function (item) {
      return item.value;
    });

    return window.map.adverts.filter(function (item) {
      if (!setFilterValues(houseType.value, item.offer.type)) {
        return false;
      }
      if (!setFilterPrice(item.offer.price)) {
        return false;
      }
      if (!setFilterValues(roomsNumber.value, item.offer.rooms + '')) {
        return false;
      }
      if (!setFilterValues(guestsNumber.value, item.offer.guests + '')) {
        return false;
      }
      if (!setFilterFeatures(houseFeatures, item.offer.features)) {
        return false;
      }

      return true;
    });
  }

  window.filter = setFilters;
})();

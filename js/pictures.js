'use strict';

(function () {
  var photosContainer = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  var pictureTemplate = document.querySelector('#picture-template').content;

  function debounce(callback, photosArray) {
    var DEBOUNCE_INTERVAL = 1000;
    var lastTimeout;

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      callback(photosArray);
    }, DEBOUNCE_INTERVAL);
  }

  function renderPhotos(photosArray) {
    photosContainer.innerHTML = '';

    for (var i = 0; i < photosArray.length; i++) {
      var photoElement = pictureTemplate.cloneNode(true);

      photoElement.querySelector('img').setAttribute('src', photosArray[i].url);
      photoElement.querySelector('.picture-likes').textContent = photosArray[i].likes;
      photoElement.querySelector('.picture-comments').textContent = photosArray[i].comments.length;
      fragment.appendChild(photoElement);
    }

    photosContainer.appendChild(fragment);

    Array.prototype.forEach.call(photosContainer.querySelectorAll('.picture'), function (item, index) {
      item.dataSource = photosArray[index];
    });
  }

  function showSortedPhotos(photos, parameter) {
    var sortedPhotos = photos.slice();

    sortedPhotos.sort(function (left, right) {
      switch (typeof right[parameter]) {
        case 'object':
          return right[parameter].length - left[parameter].length;
        case 'number':
          return right[parameter] - left[parameter];
        case 'string':
          return parseInt(right[parameter], 10) - parseInt(left[parameter], 10);
        default:
          throw new Error('Передан параметр ' + typeof right[parameter] + 'неверный');
      }
    });

    renderPhotos(sortedPhotos);
  }

  function showRandomPhoto(photos) {
    var randomPhotos = [];

    while (randomPhotos.length < 15) {
      var element = photos[window.util.generateNumber(0, photos.length - 1)];
      if (randomPhotos.indexOf(element) === -1) {
        randomPhotos.push(element);
      }
    }

    renderPhotos(randomPhotos);
  }

  function successHandler(photos) {
    var filters = document.querySelector('.filters');
    var filterRecommend = document.querySelector('#filter-recommend');
    var filterPopular = document.querySelector('#filter-popular');
    var filterDiscussed = document.querySelector('#filter-discussed');
    var filterRandom = document.querySelector('#filter-random');
    filters.classList.remove('hidden');

    renderPhotos(photos);

    filterRecommend.addEventListener('click', function () {
      debounce.bind(renderPhotos(photos));
    });

    filterPopular.addEventListener('click', function () {
      debounce.bind(showSortedPhotos(photos, 'likes'));
    });

    filterDiscussed.addEventListener('click', function () {
      debounce.bind(showSortedPhotos(photos, 'comments'));
    });

    filterRandom.addEventListener('click', function () {
      debounce.bind(showRandomPhoto(photos));
    });
  }

  window.backend.load(successHandler, window.util.errorHandler);
})();

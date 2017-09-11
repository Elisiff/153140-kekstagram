'use strict';

(function () {
  var sortPhotos = [];
  var filters = document.querySelector('.filters');

  function getFilter() {
    var recommended = document.querySelector('.filters-radio[value=recommend]');
    var popular = document.querySelector('.filters-radio[value=popular]');

    filters.addEventListener('change', function (evt) {
      evt.preventDefault();

      if (recommended.checked) {
        successHandler(sortPhotos);
        // console.log(sortPhotos.slice());
      } else
      if (popular.checked) {
        var sortPhotosCopy = sortPhotos.slice();
        sortPhotosCopy.sort(function (left, right) {
          if (left.likes > right.likes) {
            return 1;
          } else
          if (left.likes < right.likes) {
            return -1;
          } else {
            return 0;
          }
        });
        successHandler(sortPhotosCopy);
      }
    });
  }
  getFilter();

  function successHandler(photos) {
    sortPhotos = photos;
    var pictureTemplate = document.querySelector('#picture-template').content;
    window.picturesContainer = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      var picture = pictureTemplate.cloneNode(true);
      picture.querySelector('img').setAttribute('src', photos[i].url);
      picture.querySelector('.picture-likes').textContent = photos[i].likes;
      picture.querySelector('.picture-comments').textContent = photos[i].comments.length;
      fragment.appendChild(picture);
    }

    window.picturesContainer.appendChild(fragment);

    Array.prototype.forEach.call(window.picturesContainer.querySelectorAll('.picture'), function (item, index) {
      item.dataSource = photos[index];
    });

    filters.classList.remove('hidden');
  }

  window.backend.load(successHandler, window.util.errorHandler);
})();

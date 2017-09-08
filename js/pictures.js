'use strict';

(function () {
  function successHandler(photos) {
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
  }

  window.errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, window.errorHandler);
})();

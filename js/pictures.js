'use strict';

(function () {
  function setPicture(photos) {
    var pictureTemplate = document.querySelector('#picture-template').content;
    var picture = pictureTemplate.cloneNode(true);

    picture.querySelector('img').src = photos.url;
    picture.querySelector('.picture-likes').textContent = photos.likes;
    picture.querySelector('.picture-comments').textContent = photos.comments.length;

    return picture;
  }

  function appendFragments() {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photosArray.length; i++) {
      fragment.appendChild(setPicture(photosArray[i]));
    }
    return fragment;
  }

  window.picturesContainer = document.querySelector('.pictures');
  picturesContainer.appendChild(appendFragments(photosArray));
})();

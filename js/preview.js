'use strict';

(function () {
  window.getPictureInGallery = function (target, callback) {
    var galleryPreview = document.querySelector('.gallery-overlay-preview');
    var targetData = target.dataSource || target.parentElement.dataSource;

    if (targetData) {
      galleryPreview.querySelector('.gallery-overlay-image').src = targetData.url;
      galleryPreview.querySelector('.likes-count').textContent = targetData.likes;
      galleryPreview.querySelector('.comments-count').textContent = targetData.comments.length;
    } else {
      return false;
    }

    if (typeof callback === 'function') {
      callback();
    }

    return window.getPictureInGallery;
  };
})();

'use strict';

(function () {
  var gallery = document.querySelector('.gallery-overlay');
  var galleryClose = gallery.querySelector('.gallery-overlay-close');
  window.picturesContainer = document.querySelector('.pictures');

  function pressEsc(evt) {
    window.util.isEscEvent(evt, closeGalleryOverlay);
  }

  function openGalleryOverlay() {
    gallery.classList.remove('hidden');
    document.addEventListener('keydown', pressEsc);
  }

  function closeGalleryOverlay() {
    gallery.classList.add('hidden');
    document.removeEventListener('keydown', pressEsc);
  }

  function onPictureClick() {
    window.picturesContainer.addEventListener('click', function (evt) {
      evt.preventDefault();
      var target = evt.target;
      window.getPictureInGallery(target, openGalleryOverlay);
    });
  }
  onPictureClick();

  function onPictureKeydown() {
    for (var i = 0; i < window.picturesContainer.children.length; i++) {
      window.picturesContainer.children[i].addEventListener('keydown', function (evt) {
        evt.preventDefault();
        var target = evt.target;
        if (evt.keyCode === window.ENTER_KEYCODE) {
          window.getPictureInGallery(target, openGalleryOverlay);
        }
      });
    }
  }
  onPictureKeydown();

  function onGalleryCloseClick() {
    galleryClose.addEventListener('click', function () {
      closeGalleryOverlay();
    });
  }
  onGalleryCloseClick();

  function onGalleryCloseKeydown() {
    galleryClose.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, closeGalleryOverlay);
    });
  }
  onGalleryCloseKeydown();
})();

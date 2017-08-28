'use strict';

(function () {
  var gallery = document.querySelector('.gallery-overlay');

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
    picturesContainer.addEventListener('click', function (evt) {
      evt.preventDefault();
      var target = evt.target;

      for (var i = 0; i < picturesContainer.children.length; i++) {
        if (picturesContainer.children[i].querySelector('img') === target) {
          gallery.appendChild(getPictureInGallery(photosArray[i]));
        }
      }
      openGalleryOverlay();
    });
  }
  onPictureClick();

  function onPictureEnterPress() {
    var picture = document.querySelectorAll('.picture');

    for (var i = 0; i < picture.length; i++) {
      picture[i].addEventListener('keydown', function (evt) {
        var target = evt.target;

        if (evt.keyCode === ENTER_KEYCODE) {
          for (var k = 0; k < picture.length; k++) {
            if (picture[k] === target) {
              gallery.appendChild(getPictureInGallery(photosArray[k]));
            }
          }
          openGalleryOverlay();
        }
      });
    }
  }
  onPictureEnterPress();

  var galleryClose = gallery.querySelector('.gallery-overlay-close');

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

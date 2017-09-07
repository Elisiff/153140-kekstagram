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

  var picture = document.querySelectorAll('.picture');

// Посмотри тут, пожалуйста, не получается сделать превью картинки
  // function onPictureClick() {
  //   for (var i = 0; i < picture.length; i++) {
  //     picture[i].addEventListener('click', function (evt) {
  //       evt.preventDefault();
  //       var target = evt.target;

  //       for (var k = 0; k < picture.length; k++) {
  //         if (picture[k].querySelector('img') === target) {
  //           gallery.appendChild(window.backend.load(window.getPictureInGallery(photos(k)), window.errorHandler));
  //         }
  //       }
  //       openGalleryOverlay();
  //     });
  //   }
  // }
  // onPictureClick();

  // function onPictureEnterPress() {
  //   for (var i = 0; i < picture.length; i++) {
  //     picture[i].addEventListener('keydown', function (evt) {
  //       var target = evt.target;

  //       if (evt.keyCode === window.ENTER_KEYCODE) {
  //         for (var k = 0; k < picture.length; k++) {
  //           if (picture[k] === target) {
  //             gallery.appendChild(window.backend.load(window.getPictureInGallery(photos(k)), window.errorHandler));
  //           }
  //         }
  //         openGalleryOverlay();
  //       }
  //     });
  //   }
  // }
  // onPictureEnterPress();

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

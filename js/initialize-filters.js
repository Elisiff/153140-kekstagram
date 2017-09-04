'use strict';

(function () {
  window.initializeFilters = function (applyFilter) {
    var form = document.querySelector('.upload-form');
    var scaleImage = form.querySelector('.effect-image-preview');
    // debugger;
  // function addEffect() {
    if (scaleImage.classList.contains('effect-chrome')) {
      effect = 'grayscale(' + (window.levelStyleX / window.levelBarWidth) + ')';
      applyFilter(effect);
    } else
    if (scaleImage.classList.contains('effect-sepia')) {
      effect = 'sepia(' + (window.levelStyleX / window.levelBarWidth) + ')';
      applyFilter(effect);
    } else
    if (scaleImage.classList.contains('effect-marvin')) {
      effect = 'invert(' + (window.levelStyleX * 100 / window.levelBarWidth) + '%)';
      applyFilter(effect);
    } else
    if (scaleImage.classList.contains('effect-phobos')) {
      effect = 'blur(' + (window.levelStyleX * 3 / window.levelBarWidth) + 'px)';
      applyFilter(effect);
    } else
    if (scaleImage.classList.contains('effect-heat')) {
      effect = 'brightness(' + (window.levelStyleX * 3 / window.levelBarWidth) + ')';
      applyFilter(effect);
    } else
    if ((window.classes.length === 1) || scaleImage.classList.contains('effect-none')) {
      effect = 'none';
      applyFilter(effect);
    }
    // }
    // addEffect();
    // debugger;
  };
})();

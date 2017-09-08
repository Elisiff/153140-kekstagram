'use strict';

(function () {
  window.initializeFilters = function (applyFilter) {
    var form = document.querySelector('.upload-form');
    var scaleImage = form.querySelector('.effect-image-preview');
    var effectChoice = window.classes[1];

    if (scaleImage.classList.contains(effectChoice)) {

      switch (effectChoice) {
        case ('effect-chrome'):
          effect = 'grayscale(' + (window.levelStyleX / window.levelBarWidth) + ')';
          break;
        case ('effect-sepia'):
          effect = 'sepia(' + (window.levelStyleX / window.levelBarWidth) + ')';
          break;
        case ('effect-marvin'):
          effect = 'invert(' + (window.levelStyleX * 100 / window.levelBarWidth) + '%)';
          break;
        case ('effect-phobos'):
          effect = 'blur(' + (window.levelStyleX * 3 / window.levelBarWidth) + 'px)';
          break;
        case ('effect-heat'):
          effect = 'brightness(' + (window.levelStyleX * 3 / window.levelBarWidth) + ')';
          break;
        case ('effect-none'):
          effect = 'none';
          break;
        default:
          effect = 'none';
          break;
      }

      var effect;
      applyFilter(effect);
    }


    // if (scaleImage.classList.contains('effect-chrome')) {
    //   var effect = 'grayscale(' + (window.levelStyleX / window.levelBarWidth) + ')';
    //   applyFilter(effect);
    // } else
    // if (scaleImage.classList.contains('effect-sepia')) {
    //   effect = 'sepia(' + (window.levelStyleX / window.levelBarWidth) + ')';
    //   applyFilter(effect);
    // } else
    // if (scaleImage.classList.contains('effect-marvin')) {
    //   effect = 'invert(' + (window.levelStyleX * 100 / window.levelBarWidth) + '%)';
    //   applyFilter(effect);
    // } else
    // if (scaleImage.classList.contains('effect-phobos')) {
    //   effect = 'blur(' + (window.levelStyleX * 3 / window.levelBarWidth) + 'px)';
    //   applyFilter(effect);
    // } else
    // if (scaleImage.classList.contains('effect-heat')) {
    //   effect = 'brightness(' + (window.levelStyleX * 3 / window.levelBarWidth) + ')';
    //   applyFilter(effect);
    // } else
    // if ((window.classes.length === 1) || scaleImage.classList.contains('effect-none')) {
    //   effect = 'none';
    //   applyFilter(effect);
    // }
  };
})();

'use strict';

(function () {
  window.initializeScale = function (scaleElement, adjustScale) {
    var form = document.querySelector('.upload-form');
    var formResizeControls = form.querySelector('.upload-resize-controls-value');

    function getMinMax(scale) {
      if (scale >= 100) {
        formResizeControls.value = '100%';
      } else
      if (scale <= 25) {
        formResizeControls.value = '25%';
      }
    }

    function onMinusPlusClick() {
      var formResizeMinus = form.querySelector('.upload-resize-controls-button-dec');
      var formResizePlus = form.querySelector('.upload-resize-controls-button-inc');

      scaleElement.addEventListener('click', function (evt) {
        var target = evt.target;

        if (target === formResizeMinus) {
          var formResizeCtrls = Number(formResizeControls.value.replace(/%/g, ''));
          formResizeCtrls -= 25;
          formResizeControls.value = formResizeCtrls + '%';
          getMinMax(formResizeCtrls);
          var transform = 'scale(' + ((formResizeControls.value.replace(/%/g, '')) / 100) + ')';
          adjustScale(transform);
        } else
        if (target === formResizePlus) {
          formResizeCtrls = Number(formResizeControls.value.replace(/%/g, ''));
          formResizeCtrls += 25;
          formResizeControls.value = formResizeCtrls + '%';
          getMinMax(formResizeCtrls);
          transform = 'scale(' + ((formResizeControls.value.replace(/%/g, '')) / 100) + ')';
          adjustScale(transform);
        }
      });
    }
    onMinusPlusClick();
  };
})();

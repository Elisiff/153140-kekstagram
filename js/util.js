'use strict';

(function () {
  window.ESC_KEYCODE = 27;
  window.ENTER_KEYCODE = 13;

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === window.ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === window.ENTER_KEYCODE) {
        action();
      }
    },
    errorHandler: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = '75%';
      node.style.fontSize = '26px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };
})();

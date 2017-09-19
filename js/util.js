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
      window.node = document.createElement('div');
      window.node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      window.node.style.position = 'absolute';
      window.node.style.left = 0;
      window.node.style.right = '75%';
      window.node.style.fontSize = '26px';

      window.node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', window.node);
    },
    generateNumber: function (min, max) {
      var rand = min + Math.random() * (max + 1 - min);
      rand = Math.floor(rand);
      return rand;
    }
  };
})();

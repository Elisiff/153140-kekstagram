'use strict';

(function () {
  var form = document.querySelector('.upload-form');

  function pressEscForm(evt) {
    window.util.isEscEvent(evt, closeForm);
  }

  var formUploadOverlay = form.querySelector('.upload-overlay');
  var levelContainer = form.querySelector('.upload-effect-level');

  function openForm() {
    formUploadOverlay.classList.remove('hidden');
    levelContainer.classList.add('hidden');
    document.addEventListener('keydown', pressEscForm);
  }

  function closeForm() {
    formUploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', pressEscForm);
  }

  var scaleImage = form.querySelector('.effect-image-preview');
  var descriptionForm = form.querySelector('.upload-form-description');
  var formResizeControls = form.querySelector('.upload-resize-controls-value');

  function resetForm() {
    window.classes = scaleImage.className.split(' ');
    if (window.classes.length === 2) {
      scaleImage.classList.remove(window.classes[1]);
      window.classes.splice(1, 1);
    }
    scaleImage.style = 'transform: scale(1)';
    scaleImage.setAttribute('style', 'filter: none');
    formResizeControls.setAttribute('value', '100%');
    levelContainer.classList.add('hidden');
    form.reset();
  }

  function onUploadFileClick() {
    var uploadFile = form.querySelector('.upload-input');

    uploadFile.addEventListener('change', function (evt) {
      resetForm();
      openForm();
    });
  }
  onUploadFileClick();

  var cancelBtn = form.querySelector('.upload-form-cancel');

  function onCancelBtnClick() {
    cancelBtn.addEventListener('click', function (evt) {
      closeForm();
    });
  }
  onCancelBtnClick();

  function onDescriptionKeydown() {
    descriptionForm.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.ESC_KEYCODE) {
        evt.stopPropagation();
      }
    });
  }
  onDescriptionKeydown();

  function onCancelBtnKeydown() {
    cancelBtn.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, closeForm);
    });
  }
  onCancelBtnKeydown();

  function validateDescription() {
    if (descriptionForm.value.length < 30) {
      descriptionForm.setCustomValidity('Комментарий должен состоять минимум из 30 символов');
      descriptionForm.setAttribute('style', 'box-shadow: 0 0 0 1px red;');
      return false;
    } else
    if (descriptionForm.value.length > 100) {
      descriptionForm.setCustomValidity('Комментарий должен состоять максимум из 100 символов');
      descriptionForm.setAttribute('style', 'box-shadow: 0 0 0 1px red;');
      return false;
    } else {
      descriptionForm.setCustomValidity('');
      descriptionForm.setAttribute('style', 'box-shadow: none');
      return true;
    }
  }

  var hashtagsField = form.querySelector('.upload-form-hashtags');

  function validateHashtags() {
    var hashtagsFieldValue = ((hashtagsField.value) || ('')).trim(); // удаляем пробелы в начале и конце строки
    var hashtags = hashtagsFieldValue.split(/\s+/); // считаем 1 и более пробел за 1 пробел

    if (!(hashtagsFieldValue === '')) {
      if (hashtags.length > 5) {
        hashtagsField.setCustomValidity('Хэш-тегов должно быть не более 5');
        hashtagsField.setAttribute('style', 'box-shadow: 0 0 0 1px red;');
        return false;
      } else {
        for (var i = 0; i < hashtags.length; i++) {
          if (!(hashtags[i].startsWith('#'))) {
            hashtagsField.setCustomValidity('Хэш-тег должен начинаться с # и состоять еще из одного символа');
            hashtagsField.setAttribute('style', 'box-shadow: 0 0 0 1px red;');
            return false;
          } else
          if (hashtags[i].endsWith(',')) {
            hashtagsField.setCustomValidity('Хэш-теги должны разделяться пробелами и не могут заканчиваться запятой');
            hashtagsField.setAttribute('style', 'box-shadow: 0 0 0 1px red;');
            return false;
          } else
          if (hashtags[i].split('#').length > 2) {
            hashtagsField.setCustomValidity('Хэш-теги должны разделяться пробелами');
            hashtagsField.setAttribute('style', 'box-shadow: 0 0 0 1px red;');
            return false;
          } else
          if (hashtags[i].length > 20) {
            hashtagsField.setCustomValidity('Длина одного хэш-тега не должна превышать 20 символов');
            hashtagsField.setAttribute('style', 'box-shadow: 0 0 0 1px red;');
            return false;
          } else
          if (hashtags.indexOf(hashtags[i]) !== i) {
            hashtagsField.setCustomValidity('Хэш-теги не должны повторяться');
            hashtagsField.setAttribute('style', 'box-shadow: 0 0 0 1px red;');
            return false;
          }
        }
        hashtagsFieldValid();
        return true;
      }
    } else {
      hashtagsFieldValid();
      return true;
    }
  }

  function hashtagsFieldValid() {
    hashtagsField.setCustomValidity('');
    hashtagsField.setAttribute('style', 'box-shadow: none;');
  }

  function addEffect() {
    if (scaleImage.classList.contains('effect-chrome')) {
      window.effect = 'grayscale(' + (window.levelStyleX / window.levelBarWidth) + ')';
    } else
    if (scaleImage.classList.contains('effect-sepia')) {
      window.effect = 'sepia(' + (window.levelStyleX / window.levelBarWidth) + ')';
    } else
    if (scaleImage.classList.contains('effect-marvin')) {
      window.effect = 'invert(' + (window.levelStyleX * 100 / window.levelBarWidth) + '%)';
    } else
    if (scaleImage.classList.contains('effect-phobos')) {
      window.effect = 'blur(' + (window.levelStyleX * 3 / window.levelBarWidth) + 'px)';
    } else
    if (scaleImage.classList.contains('effect-heat')) {
      window.effect = 'brightness(' + (window.levelStyleX * 3 / window.levelBarWidth) + ')';
    } else
    if ((window.classes.length === 1) || scaleImage.classList.contains('effect-none')) {
      window.effect = 'none';
    }
  }

  function getMinMax(scale) {
    if (scale >= 100) {
      formResizeControls.value = '100%';
      addEffect();
      scaleImage.style.cssText = 'transform: scale(1); filter: ' + window.effect + '; -webkit-filter: ' + window.effect + ';';
    } else
    if (scale <= 25) {
      formResizeControls.value = '25%';
      addEffect();
      scaleImage.style.cssText = 'transform: scale(0.25); filter: ' + window.effect + '; -webkit-filter: ' + window.effect + ';';
    }
  }

  function onMinusClick() {
    var formResizeMinus = form.querySelector('.upload-resize-controls-button-dec');
    formResizeMinus.addEventListener('click', function (evt) {
      var formResizeCtrls = Number(formResizeControls.value.replace(/%/g, ''));
      formResizeCtrls -= 25;
      formResizeControls.value = formResizeCtrls + '%';
      var transform = 'scale(0.' + (formResizeControls.value.replace(/%/g, '')) + ')';
      addEffect();
      scaleImage.style.cssText = 'transform: ' + transform + '; filter: ' + window.effect + '; -webkit-filter: ' + window.effect + ';';

      getMinMax(formResizeCtrls);
    });
  }
  onMinusClick();

  function onPlusClick() {
    var formResizePlus = form.querySelector('.upload-resize-controls-button-inc');
    formResizePlus.addEventListener('click', function (evt) {
      var formResizeCtrls = Number(formResizeControls.value.replace(/%/g, ''));
      formResizeCtrls += 25;
      formResizeControls.value = formResizeCtrls + '%';
      var transform = 'scale(0.' + (formResizeControls.value.replace(/%/g, '')) + ')';
      addEffect();
      scaleImage.style.cssText = 'transform: ' + transform + '; filter: ' + window.effect + '; -webkit-filter: ' + window.effect + ';';

      getMinMax(formResizeCtrls);
    });
  }
  onPlusClick();

  var level = form.querySelector('.upload-effect-level-pin');
  var levelMiniBar = form.querySelector('.upload-effect-level-val');

  function onLevelMove() {
    var levelBar = form.querySelector('.upload-effect-level-line');
    var levelContainerWidth = getComputedStyle(levelContainer).width;
    levelContainerWidth = Number(levelContainerWidth.replace(/px/, ''));
    var levelBarPaddingL = getComputedStyle(levelBar).left;
    levelBarPaddingL = Number(levelBarPaddingL.replace(/px/, ''));
    var levelBarPaddingR = getComputedStyle(levelBar).right;
    levelBarPaddingR = Number(levelBarPaddingR.replace(/px/, ''));
    window.levelBarWidth = levelContainerWidth - (levelBarPaddingL + levelBarPaddingR);
    window.levelStyleX = Number(getComputedStyle(level).left.replace(/%/, '')) * window.levelBarWidth / 100;

    level.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX
      };

      function onMouseMove(moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX
        };

        startCoords = {
          x: moveEvt.clientX
        };

        level.style.left = (level.offsetLeft - shift.x) + 'px';
        levelMiniBar.style.width = level.style.left;

        if (level.offsetLeft > window.levelBarWidth) {
          level.style.left = window.levelBarWidth + 'px';
          levelMiniBar.style.width = level.style.left;
        } else
        if (level.offsetLeft < 0) {
          level.style.left = 0 + 'px';
          levelMiniBar.style.width = level.style.left;
        }

        window.levelStyleX = Number(level.style.left.replace(/px/, ''));
        var styleTransform = scaleImage.style.transform;

        if ((window.classes.length === 1) || scaleImage.classList.contains('effect-none')) {
          scaleImage.style.cssText = 'transform: ' + styleTransform + '; filter: none; -webkit-filter: none;';
        } else {
          addEffect();
          scaleImage.style.cssText = 'transform: ' + styleTransform + '; filter: ' + window.effect + '; -webkit-filter: ' + window.effect + ';';
        }
      }

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }
  onLevelMove();

  function onEffectControlsClick() {
    var effectControls = form.querySelector('.upload-effect-controls');
    effectControls.addEventListener('click', function (evt) {
      evt.preventDefault();
      var target = evt.target;
      var parentTarget = target.parentNode;
      var attributeFor = parentTarget.getAttribute('for');
      var input = form.querySelectorAll('input[type=radio]');
      var inputRadio = form.querySelector('input[id=' + attributeFor + ']');

      if (!(attributeFor === null)) {
        var key = attributeFor.replace(/upload-/, '');
        scaleImage.classList.add(key);

        for (var i = 0; i < input.length; i++) {
          if (input[i].checked) {
            input[i].removeAttribute('checked');
          }
        }
        inputRadio.setAttribute('checked', '');
      }

      window.classes = scaleImage.className.split(' ');

      if (window.classes.length > 2) {
        scaleImage.classList.remove(window.classes[1]);
        window.classes.splice(1, 1);
      }

      if (scaleImage.classList.contains(key)) {
        var defaultLevel = window.levelBarWidth * 20 / 100;
        formResizeControls.value = '100%';
        window.levelStyleX = defaultLevel;
        addEffect();
        scaleImage.style.cssText = 'transform: scale(1); filter: ' + window.effect + '; -webkit-filter: ' + window.effect + ';';
        level.style.left = defaultLevel + 'px';
        levelMiniBar.style.width = level.style.left;
      }

      if (scaleImage.classList.contains('effect-none')) {
        levelContainer.classList.add('hidden');
      } else {
        levelContainer.classList.remove('hidden');
      }
    });
  }
  onEffectControlsClick();

  var submitBtn = form.querySelector('.upload-form-submit');

  function onSubmitBtnClick() {
    submitBtn.addEventListener('click', function (evt) {

      if (validateHashtags() && validateDescription()) {
        evt.preventDefault();
        form.submit();
        resetForm();
        return true;
      } else {
        return false;
      }
    });
  }
  onSubmitBtnClick();

  function onSubmitBtnKeydown() {
    submitBtn.addEventListener('keydown', function (evt) {

      if ((evt.keyCode === window.ENTER_KEYCODE) && (validateHashtags() && validateDescription())) {
        evt.preventDefault();
        form.submit();
        resetForm();
        return true;
      } else {
        return false;
      }
    });
  }
  onSubmitBtnKeydown();
})();

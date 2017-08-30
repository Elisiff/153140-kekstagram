'use strict';

(function () {
  var form = document.querySelector('.upload-form');

  function pressEscForm(evt) {
    window.util.isEscEvent(evt, closeForm);
  }

  var formUploadOverlay = form.querySelector('.upload-overlay');

  function openForm() {
    formUploadOverlay.classList.remove('hidden');
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
    var classes = scaleImage.className.split(' ');
    if (classes.length === 2) {
      scaleImage.classList.remove(classes[1]);
      classes.splice(1, 1);
    }
    scaleImage.style = 'transform: scale(1)';
    formResizeControls.setAttribute('value', '100%');
    form.reset();
  }

  function onUploadFileClick() {
    var uploadFile = form.querySelector('.upload-input');
    uploadFile.addEventListener('click', function (evt) {
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

    if (hashtagsFieldValue) {
      var hashtags = hashtagsFieldValue.split(/\s+/); // считаем 1 и более пробел за 1 пробел

      if (hashtags.length > 5) {
        hashtagsField.setCustomValidity('Хэш-тегов должно быть не более 5');
        hashtagsField.setAttribute('style', 'box-shadow: 0 0 0 1px red;');
      } else {
        var customValidityMessage = null;
        var i = 0;

        for (i = 0; i < hashtags.length && customValidityMessage === null; i++) {
          if (!(hashtags[i].startsWith('#'))) {
            customValidityMessage = 'Хэш-тег должен начинаться с # и состоять еще из одного символа';
          } else
          if (hashtags[i].endsWith(',')) {
            customValidityMessage = 'Хэш-теги должны разделяться пробелами и не могут заканчиваться запятой';
          } else
          if (hashtags[i].split('#').length > 2) {
            customValidityMessage = 'Хэш-теги должны разделяться пробелами';
          } else
          if (hashtags[i].length > 20) {
            customValidityMessage = 'Длина одного хэш-тега не должна превышать 20 символов';
          } else
          if (hashtags.indexOf(hashtags[i]) !== i) {
            customValidityMessage = 'Хэш-теги не должны повторяться';
          }
        }

        if (customValidityMessage) {
          hashtagsField.setCustomValidity(customValidityMessage);
          hashtagsField.setAttribute('style', 'box-shadow: 0 0 0 1px red;');
        } else {
          hashtagsFieldValid();
        }
      }
    }
  }

  function hashtagsFieldValid() {
    hashtagsField.setCustomValidity('');
    hashtagsField.setAttribute('style', 'box-shadow: none;');
  }

  function getMinMax(scale) {
    if (scale >= 100) {
      formResizeControls.value = '100%';
      scaleImage.setAttribute('style', 'transform: scale(1)');
    } else
    if (scale <= 25) {
      formResizeControls.value = '25%';
      scaleImage.setAttribute('style', 'transform: scale(0.25)');
    }
  }

  function onMinusClick() {
    var formResizeMinus = form.querySelector('.upload-resize-controls-button-dec');
    formResizeMinus.addEventListener('click', function (evt) {
      var formResizeCtrls = Number(formResizeControls.value.replace(/%/g, ''));
      formResizeCtrls -= 25;
      formResizeControls.value = formResizeCtrls + '%';
      var transform = 'scale(0.' + (formResizeControls.value.replace(/%/g, '')) + ')';
      scaleImage.setAttribute('style', ('transform: ' + transform));

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
      scaleImage.setAttribute('style', ('transform: ' + transform));

      getMinMax(formResizeCtrls);
    });
  }
  onPlusClick();

  function onEffectControlsClick() {
    var effectControls = form.querySelector('.upload-effect-controls');
    effectControls.addEventListener('click', function (evt) {
      evt.preventDefault();
      var target = evt.target;
      var parentTarget = target.parentNode;
      var attributeFor = parentTarget.getAttribute('for');
      var key = attributeFor.replace(/upload-/, '');
      scaleImage.classList.add(key);
      var classes = scaleImage.className.split(' ');

      if (classes.length > 2) {
        scaleImage.classList.remove(classes[1]);
        classes.splice(1, 1);
      }
    });
  }
  onEffectControlsClick();

  var submitBtn = form.querySelector('.upload-form-submit');

  function onSubmitBtnClick() {
    submitBtn.addEventListener('click', function (evt) {

      if (validateDescription() && validateHashtags()) {
        evt.preventDefault();
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

      if ((evt.keyCode === window.ENTER_KEYCODE) && (validateDescription()) && validateHashtags()) {
        evt.preventDefault();
        resetForm();
        return true;
      } else {
        return false;
      }
    });
  }
  onSubmitBtnKeydown();
})();

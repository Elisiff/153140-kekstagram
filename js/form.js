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
    uploadFile.addEventListener('change', function (evt) {
      if (evt.target.value !== '') {
        resetForm();
        openForm();
      }
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

  // !! Не знаю, как сделать валидацию хеш-тегов, ничего не работает

  var hashtagsField = form.querySelector('.upload-form-hashtags');

  function validateHashtags(tags) {
    var filterHashtags = /^#\w+$/;
    tags.forEach(function (item, i) {
      if (tags.length > 5) {
        hashtagsField.setCustomValidity('Хэш-тегов должно быть не более 5');
        hashtagsField.setAttribute('style', 'box-shadow: 0 0 0 1px red;');
        return false;
      } else
      if ((!filterHashtags.test(tags[i])) && (tags[0] !== '')) {
        hashtagsField.setCustomValidity('Хэш-тег должен начинаться с # и состоять еще из одного символа');
        hashtagsField.setAttribute('style', 'box-shadow: 0 0 0 1px red;');
        return false;
      } else
      if (tags[i].length > 20) {
        hashtagsField.setCustomValidity('Длина одного хэш-тега — не более 20 символов');
        hashtagsField.setAttribute('style', 'box-shadow: 0 0 0 1px red;');
        return false;
      } else {
      // if (tags !== hashtagsField.value.split(' ')) {
      //   hashtagsField.setCustomValidity('wtttg');
      //   hashtagsField.setAttribute('style', 'box-shadow: 0 0 0 1px red;');
      //   return false;
      // } else {
        hashtagsField.setCustomValidity('');
        hashtagsField.setAttribute('style', 'box-shadow: none');
        return true;
      }
    });
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
      var hashtags = hashtagsField.value.split(' ');
      // console.log(hashtags);
      validateHashtags(hashtags);

      if (validateDescription() && validateHashtags(hashtags)) {
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
      var hashtags = hashtagsField.value.split(' ');
      validateHashtags(hashtags);

      if ((evt.keyCode === window.ENTER_KEYCODE) && (validateDescription())) {
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

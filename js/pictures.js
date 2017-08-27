'use strict';

(function () {
  function getRandomComment() {
    var comments = [
      'Всё отлично!', 'В целом всё неплохо. Но не всё.',
      'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
      'Моя бабушка случайно чихнула с фотоаппаратом в руках, и у неё получилась фотография лучше.',
      'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота, и у меня получилась фотография лучше.',
      'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
    ];

    var commentIndex = generateNumber(0, comments.length - 1);
    return comments[commentIndex];
  }

  function generateNumber(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

  function getPhotoUrl() {
    var url = [];
    for (var i = 1; i <= 26; i++) {
      url.push('photos/' + i + '.jpg');
    }
    return url;
  }

  var data = getPhotoUrl(data);

  function generatePhotoArray() {
    var photo;

    var photoArray = data.map(function (index) {
      photo = {
        url: index,
        likes: generateNumber(15, 200),
        comments: getRandomComment()
      };
      return photo;
    });
    return photoArray;
  }

  // Галлерея на сайте
  var uploadOverlay = document.querySelector('.upload-overlay');
  uploadOverlay.classList.add('hidden');

  var gallery = document.querySelector('.gallery-overlay');

  function setPicture(photos) {
    var pictureTemplate = document.querySelector('#picture-template').content;
    var picture = pictureTemplate.cloneNode(true);

    picture.querySelector('img').src = photos.url;
    picture.querySelector('.picture-likes').textContent = photos.likes;
    picture.querySelector('.picture-comments').textContent = photos.comments.length;

    return picture;
  }

  function appendFragments() {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photosArray.length; i++) {
      fragment.appendChild(setPicture(photosArray[i]));
    }
    return fragment;
  }

  var photosArray = generatePhotoArray(data);
  var picturesContainer = document.querySelector('.pictures');

  picturesContainer.appendChild(appendFragments(photosArray));

  function getPictureInGallery(photos) {
    var galleryPreview = gallery.querySelector('.gallery-overlay-preview');

    galleryPreview.querySelector('.gallery-overlay-image').src = photos.url;
    galleryPreview.querySelector('.likes-count').textContent = photos.likes;
    galleryPreview.querySelector('.comments-count').textContent = photos.comments.length;

    return galleryPreview;
  }

  // События
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var picture = document.querySelectorAll('.picture');
  var galleryClose = gallery.querySelector('.gallery-overlay-close');

  function pressEsc(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeGalleryOverlay();
    }
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

  galleryClose.addEventListener('click', function () {
    closeGalleryOverlay();
  });

  galleryClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closeGalleryOverlay();
    }
  });

  // Форма
  var form = document.querySelector('.upload-form');
  var uploadFile = form.querySelector('.upload-input');
  var uploadOverlay = form.querySelector('.upload-overlay');
  var cancelBtn = form.querySelector('.upload-form-cancel');
  var descriptionForm = form.querySelector('.upload-form-description');
  var submitBtn = form.querySelector('.upload-form-submit');
  var formResizeControls = form.querySelector('.upload-resize-controls-value');
  var formResizeMinus = form.querySelector('.upload-resize-controls-button-dec');
  var formResizePlus = form.querySelector('.upload-resize-controls-button-inc');
  var scaleImage = form.querySelector('.effect-image-preview');

  function pressEscForm(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeForm();
    }
  }

  function openForm() {
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', pressEscForm);
  }

  function closeForm() {
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', pressEscForm);
  }

  uploadFile.addEventListener('change', function (evt) {
    if (evt.target.value !== '') {
      openForm();
    }
  });

  cancelBtn.addEventListener('click', function (evt) {
    closeForm();
  });

  // !!Если фокус находится на форме ввода комментария, то форма закрываться не должна
  descriptionForm.addEventListener('focus', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeForm(); // что тут написать?
    }
  });

  cancelBtn.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closeForm();
    }
  });

  // !!Все равно отправляет форму, даже если есть ошибки, как исправить?
  submitBtn.addEventListener('click', function (evt) {
    form.submit();
  });

  descriptionForm.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < 30) {
      target.setCustomValidity('Комментарий должен состоять минимум из 30 символов');
    } else
    if (target.value.length > 100) {
      target.setCustomValidity('Комментарий должен состоять максимум из 100 символов');
    } else {
      target.setCustomValidity('');
    }
  });

  // !!Все равно отправляет форму, даже если есть ошибки, как исправить?
  submitBtn.addEventListener('keydown', function (evt) {
    if ((evt.keyCode === ENTER_KEYCODE) && (descriptionForm.validity.valid)) {
      form.submit();
    }
  });

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

  formResizeControls.value = '100%';

  formResizeMinus.addEventListener('click', function (evt) {
    var formResizeCtrls = Number(formResizeControls.value.replace(/%/g,''));
    formResizeCtrls -= 25;
    formResizeControls.value = formResizeCtrls + '%';
    var transform = 'scale(0.' + (formResizeControls.value.replace(/%/g,'')) + ')';
    scaleImage.setAttribute('style', ('transform: ' + transform));

    getMinMax (formResizeCtrls);
  });

  formResizePlus.addEventListener('click', function (evt) {
    var formResizeCtrls = Number(formResizeControls.value.replace(/%/g,''));
    formResizeCtrls += 25;
    formResizeControls.value = formResizeCtrls + '%';
    var transform = 'scale(0.' + (formResizeControls.value.replace(/%/g,'')) + ')';
    scaleImage.setAttribute('style', ('transform: ' + transform));

    getMinMax (formResizeCtrls);
  });


})();

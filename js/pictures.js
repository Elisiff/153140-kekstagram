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
  gallery.classList.add('hidden');

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

  function fillGalleryPhotos(photos) {
    for (var i = 0; i < photos.length; i++) {
      gallery.appendChild(getPictureInGallery(photos[i]));
    }
  }
  fillGalleryPhotos(photosArray);

  // События
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var picture = document.querySelectorAll('.picture');
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');

  function pressEsc(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeGalleryOverlay();
    }
  }

  function openGalleryOverlay() {
    galleryOverlay.classList.remove('hidden');
    document.addEventListener('keydown', pressEsc);
  }

  function closeGalleryOverlay() {
    galleryOverlay.classList.add('hidden');
    document.removeEventListener('keydown', pressEsc);
  }

  function onPictureClick() {
    picturesContainer.addEventListener('click', function (evt) { // добавляю событие клика на контейнер с рисунками
      evt.preventDefault(); // удаляю обычное поведение ссылки
      var target = evt.target; // вывожу переменную таргейт - элемент, на который кликнули

      while (target !== picturesContainer) {
        if (target.tagName === 'a') { // если таргейт - это ссылка
          getPictureInGallery(); // запускаю функцию генерации картинки (но она не работает почему-то выше)
          // var likes = target.querySelector('.picture-likes').textContent;
          // var url = target.querySelector('img').getAttribute('src');
          // generatePhotoArray(url, likes);
          // openGalleryOverlay();
          // openPopup();
        }
        target = target.parentNode; // таргейт - это родитель нынешнего таргейта
      }

      // getPictureInGallery(photosArray[i]);
      openGalleryOverlay(); // убираю с оверлея класс hidden
    });
  }
  onPictureClick(); // вызываю функцию клика

  function onPictureEnterPress() {
    for (var i = 0; i < picture.length; i++) { // перебираю массив картинок
      picture[i].addEventListener('keydown', function (evt) { // при нажатии на картинку
        var target = evt.target; // определяем таргейт
        if (picture[i] === target) {  // если картинка равна таргейту
          // return i;
          getPictureInGallery(photosArray[i]); // записываем данные для большой картинки по индексу нажатой картинки
        } else
        if (evt.keyCode === ENTER_KEYCODE) { // если нажат Enter
          openGalleryOverlay(); // бираю с оверлея класс hidden
        }
        return picture[i]; // возвращаю картинку, на которой произошло нажатие клавиши
      });
    }
  }
  onPictureEnterPress(); // вызываю функцию нажатия enter

  galleryOverlayClose.addEventListener('click', function () {
    closeGalleryOverlay();
  });

  galleryOverlayClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closeGalleryOverlay();
    }
  });
})();

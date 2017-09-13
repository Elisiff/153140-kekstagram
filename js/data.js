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

    var commentIndex = window.util.generateNumber(0, comments.length - 1);
    return comments[commentIndex];
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
        likes: window.util.generateNumber(15, 200),
        comments: getRandomComment()
      };
      return photo;
    });
    return photoArray;
  }

  window.photosArray = generatePhotoArray(data);
})();

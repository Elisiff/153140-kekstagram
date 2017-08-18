'use strict';

var comments = [
  'Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках, и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота, и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

function generateNumber(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

var photoInfo = {
  url: 'photos/{{' + (i + 1) + '}}.jpg',
  likes: generateNumber(15, 200),
  comments: comments[generateNumber(0, comments.length)]
};

alert(photoInfo.url);

var data = [];

for (var i = 0; i < 25; i++) {
  photoInfo.url = 'photos/{{' + (i + 1) + '}}.jpg';
  data.push(photoInfo);
}

alert(data[2].url);

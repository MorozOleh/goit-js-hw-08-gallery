import products from './gallery-items.js';

const gallery = document.querySelector('.js-gallery');
const lightboxEl = document.querySelector('.lightbox.js-lightbox');
const lightboxImage = document.querySelector('.lightbox__image');
const buttonClose = document.querySelector(
  'button[data-action="close-lightbox"]',
);

function makePictureSet({ preview, original, description }) {
  const listEl = document.createElement('li');
  listEl.classList.add('gallery__list');

  const titleEl = document.createElement('h2');
  titleEl.classList.add('gallery__title');
  titleEl.textContent = description;
  titleEl.style.visibility = 'hidden';

  const imageEl = document.createElement('img');
  imageEl.classList.add('gallery__image');
  imageEl.src = preview;
  imageEl.alt = description;
  imageEl.dataset.source = original;

  listEl.append(titleEl, imageEl);

  return listEl;
}

const element = products.map(makePictureSet);
gallery.append(...element);

const galleryList = document.querySelectorAll('.gallery__list');
console.log(galleryList);

gallery.addEventListener('click', onOpenModalClick);
buttonClose.addEventListener('click', onCloseModalClick);
lightboxEl.addEventListener('click', onCloseModalByOverlay);

function onOpenModalClick(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  window.addEventListener('keydown', onEscKeyPress);
  lightboxEl.classList.add('is-open');

  console.log(gallery.children);
  lightboxImage.src = event.target.dataset.source;
  lightboxImage.alt = event.target.alt;

  window.addEventListener('keydown', onMovePictures);
}

function onMovePictures(event) {
  const [...rest] = gallery.children;
  const restSrc = [];
  const restAlt = [];
  for (let i = 0; i < rest.length; i += 1) {
    restSrc.push(rest[i].childNodes[1].dataset.source);
    restAlt.push(rest[i].childNodes[1].alt);
  }

  console.log(restSrc);
  let indexOfPicture;

  if (restSrc.includes(lightboxImage.src)) {
    indexOfPicture = restSrc.indexOf(lightboxImage.src);
  }

  if (event.code === 'ArrowRight') {
    let moveForward = indexOfPicture + 1;

    if (moveForward === restSrc.length) {
      moveForward = 0;
    }
    lightboxImage.src = restSrc[moveForward];
    lightboxImage.alt = restAlt[moveForward];
  }

  if (event.code === 'ArrowLeft') {
    let moveBack = indexOfPicture - 1;

    if (moveBack === -1) {
      moveBack = restSrc.length - 1;
    }

    lightboxImage.src = restSrc[moveBack];
    lightboxImage.alt = restAlt[moveBack];
  }
}

function onCloseModalClick(event) {
  lightboxEl.classList.remove('is-open');
  lightboxImage.src = '';
  lightboxImage.alt = '';
  window.removeEventListener('keydown', onMovePictures);
  window.removeEventListener('keydown', onEscKeyPress);
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    lightboxEl.classList.remove('is-open');
    lightboxImage.src = '';
    lightboxImage.alt = '';
    window.removeEventListener('keydown', onMovePictures);
    window.removeEventListener('keydown', onEscKeyPress);
  }
}

function onCloseModalByOverlay(event) {
  if (event.target.classList.value === 'lightbox__overlay') {
    lightboxEl.classList.remove('is-open');
    lightboxImage.src = '';
    lightboxImage.alt = '';
    window.removeEventListener('keydown', onMovePictures);
    window.removeEventListener('keydown', onEscKeyPress);
  }
}

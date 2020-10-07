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

gallery.addEventListener('click', onOpenModalClick);
buttonClose.addEventListener('click', onCloseModalClick);

function onOpenModalClick(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  window.addEventListener('keydown', onEscKeyPress);
  lightboxEl.classList.add('is-open');
  lightboxImage.src = event.target.dataset.source;
  lightboxImage.alt = event.target.alt;
}

function onCloseModalClick(event) {
  window.removeEventListener('keydown', onEscKeyPress);
  lightboxEl.classList.remove('is-open');
  lightboxImage.src = '';
  lightboxImage.alt = '';
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    lightboxEl.classList.remove('is-open');
    lightboxImage.src = '';
    lightboxImage.alt = '';
  }
}

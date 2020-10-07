import products from './gallery-items.js';

const gallery = document.querySelector('.js-gallery');

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
  imageEl.src = original;
  imageEl.alt = description;
  imageEl.dataset.source = original;
  listEl.append(titleEl, imageEl);

  return listEl;
}

const element = products.map(makePictureSet);
gallery.append(...element);

gallery.addEventListener('click', onTargetClick);

function onTargetClick(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const originSrc = event.target.dataset.source;
  const originAlt = event.target.alt;
  console.log(originSrc);
  console.log(originAlt);
  // console.log(event);

  const lightboxEl = document.querySelector('.lightbox.js-lightbox');
  lightboxEl.classList.add('is-open');

  const lightboxImage = document.querySelector('.lightbox__image');

  lightboxImage.src = originSrc;
  lightboxImage.alt = originAlt;
  console.log(lightboxImage);
  console.log(lightboxEl);

  const buttonClose = document.querySelector(
    'button[data-action="close-lightbox"]',
  );

  buttonClose.addEventListener('click', onCloseModalClick);

  function onCloseModalClick(event) {
    lightboxEl.classList.remove('is-open');
    lightboxImage.src = '';
    lightboxImage.alt = '';
  }
  console.log(buttonClose);
}

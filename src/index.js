import Notiflix from 'notiflix';
import GetPhotos from './js/fetchPhotos';
import { form, gallery, loadMoreButton } from './js/mainrefs';

const getPhotos = new GetPhotos();

form.addEventListener('submit', onSearch);
loadMoreButton.addEventListener('click', onLoadMoreButton);

function onSearch(el) {
  el.preventDefault();
  getPhotos.pageNumber = 1;
  getPhotos.value = el.currentTarget.elements.searchQuery.value.trim();

  if (getPhotos.value === '')
    return Notiflix.Notify.info('Pls, input search word keys');

  getPhotos
    .fetchPhotos()
    .then(response => {
      renderPhotoListFirst(response);
      //   console.log(response.data.hits.length);
      if (response.data.hits.length < 1) {
        return Notiflix.Notify.info(
          'Sorry, no images matching your query. Please try again.'
        );
      }
    })
    .catch(er => {
      console.log(er);
    });
}

function renderPhotoListFirst(photos) {
  console.log(photos.data.hits);
  const photoCard = photos.data.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>likes: </b>${likes}
      </p>
      <p class="info-item">
        <b>views: </b>${views}
      </p>
      <p class="info-item">
        <b>comments: </b>${comments}
      </p>
      <p class="info-item">
        <b>downloads: </b>${downloads}
      </p>
    </div>
  </div>`
    )
    .join('');
  gallery.innerHTML = photoCard;
}

function onLoadMoreButton() {
  getPhotos.pageNumber += 1;
  getPhotos
    .fetchPhotos()
    .then(response => {
      renderPhotoListAdd(response);
      //   console.log(response.data.hits.length);
      //   console.log(response);
      if (response.data.hits.length < 1) {
        return Notiflix.Notify.info(
          'Sorry, no images matching your query. Please try again.'
        );
      }
    })
    .catch(er => {
      console.log(er);
    });
}

function renderPhotoListAdd(photos) {
  console.log(photos.data.hits);
  const photoCard = photos.data.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>likes: </b>${likes}
      </p>
      <p class="info-item">
        <b>views: </b>${views}
      </p>
      <p class="info-item">
        <b>comments: </b>${comments}
      </p>
      <p class="info-item">
        <b>downloads: </b>${downloads}
      </p>
    </div>
  </div>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', photoCard);
}
//
//
//
//   toggleAlertPopup();
// }

// function toggleAlertPopup() {
//   if (isAlertVisible) {
//     return;
//   }
//   isAlertVisible = true;
//   alertPopup.classList.add('is-visible');
//   setTimeout(() => {
//     alertPopup.classList.remove('is-visible');
//     isAlertVisible = false;
//   }, 3000);

// Notiflix.Notify.success('Sol lucet omnibus');
// Notiflix.Notify.failure('Qui timide rogat docet negare');
// Notiflix.Notify.warning('Memento te hominem esse');
// Notiflix.Notify.info('Cogito ergo sum');

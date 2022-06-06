import Notiflix from 'notiflix';
import GetPhotos from './js/fetchPhotos';
import { form, gallery, loadMoreButton } from './js/mainrefs';

loadMoreButton.classList.add('is-visible');
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

      if (response.data.hits.length < 1) {
        return Notiflix.Notify.info(
          'Sorry, no images matching your query. Please try again.'
        );
      } else {
        loadMoreButton.classList.remove('is-visible');
      }
    })
    .catch(er => {
      console.log(er);
    });
}

function renderPhotoListFirst(photos) {
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
      // перевірка кінця колекції початок
      if (getPhotos.page > response.data.totalHits / getPhotos.per_page) {
        loadMoreButton.classList.add('is-visible');
        return Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
      // перевірка кінця колекції кінець
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

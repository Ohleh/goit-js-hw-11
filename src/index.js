import Notiflix from 'notiflix';
import GetPhotos from './js/fetchPhotos';
// import getget from './js/fetchPhotos';

const ref = {
  form: document.querySelector('form'),
  gallery: document.querySelector('.gallery'),
};

const getPhotos = new GetPhotos();
// getPhotos.fetchPhotos('cat');

ref.form.addEventListener('submit', onSearch);

function onSearch(el) {
  el.preventDefault();

  const search = el.target.searchQuery.value;
  const searchValue = search.trim();
  if (searchValue === '')
    return Notiflix.Notify.info('Pls, input search word keys');
  getPhotos
    .fetchPhotos(searchValue)
    .then(response => {
      renderPhotoList(response);
      console.log(response);
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

function renderPhotoList(photos) {
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
  ref.gallery.innerHTML = photoCard;
}

// Notiflix.Notify.success('Sol lucet omnibus');
// Notiflix.Notify.failure('Qui timide rogat docet negare');
// Notiflix.Notify.warning('Memento te hominem esse');
// Notiflix.Notify.info('Cogito ergo sum');

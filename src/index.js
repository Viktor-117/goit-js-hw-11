import './css/styles.css';
import AxiousRequest from './axious_request';
import photoCardMarkup from './photo_card';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const fetchImages = new AxiousRequest();
let galleryLightBox = new SimpleLightbox('gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.searchForm.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.loadMoreBtn.style.display = 'none';

let totalHits = 0;

async function onFormSubmit(e) {
  e.preventDefault();
  clearGallery();
  refs.loadMoreBtn.style.display = 'none';
  const searchValue = e.target.elements.searchQuery.value.trim();

  if (!searchValue) {
    return;
  }

  fetchImages.query = searchValue;
  fetchImages.resetPage();

  const images = await fetchImages.getImage();

  if (images.hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  const galleryRender = photoCardMarkup(images.hits);

  render(galleryRender);

  totalHits = images.totalHits - images.hits.length;

  Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);

  switchLoadMoreBtn(totalHits);

  galleryLightBox.refresh();
}

async function onLoadMore() {
  const images = await fetchImages.getImage();
  const galleryRender = photoCardMarkup(images.hits);
  render(galleryRender);
  totalHits -= images.hits.length;
  if (totalHits === 0 || totalHits < 0) {
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
    refs.loadMoreBtn.style.display = 'none';
    return;
  }

  switchLoadMoreBtn(totalHits);

  galleryLightBox.refresh();
}

function render(galleryMarkup) {
  refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup);
}

function switchLoadMoreBtn(hitsValue) {
  if (hitsValue === 0 || hitsValue < 0) {
    refs.loadMoreBtn.style.display = 'none';
  } else {
    refs.loadMoreBtn.style.display = 'block';
  }
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

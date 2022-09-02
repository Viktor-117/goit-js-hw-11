export default function photoCardMarkup(images) {
  return images
    .map(image => {
      return `<div class="photo-card">
  <a class = 'gallery-link' href='${image.largeImageURL}'> 
  <img class='gallery-img' src="${image.webformatURL}" alt="${image.tags}" loading="lazy" /> 
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b><br>${image.likes}
    </p>
    <p class="info-item">
      <b>Views</b><br>${image.views}
    </p>
    <p class="info-item">
      <b>Comments</b><br>${image.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b><br>${image.downloads}
    </p>
  </div>
</div>`;
    })
    .join('');
}

import axios from 'axios';

const parameters =
  'key=29668324-2d81c9a891a84ad6e09e5568c&image_type=photo&orientation=horizontal&safesearch=true&per_page=40';

export default class AxiousRequest {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async getImage() {
    try {
      const url = `https://pixabay.com/api/?&q=${this.searchQuery}&page=${this.page}&${parameters}`;

      const response = await axios.get(url, parameters);

      await this.incrementPage();
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    }
  }

  async incrementPage() {
    this.page += 1;
    console.log(this.page);
  }

  async resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

import axios from 'axios';

const API_KEY = '27852972-cf3b4cc0dfb2dc5cda9d2c741';
axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

export default class GetPhotos {
  constructor() {
    this.page = 1;
    this.per_page = 20;
  }
  async fetchPhotos(query) {
    return await axios.get(
      `/?q=${query}&page=${this.page}&per_page=${this.per_page}`
    );
  }
}

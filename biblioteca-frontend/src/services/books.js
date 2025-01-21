import axios from 'axios';

const API_URL = '/api/books';

export const getBooks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getBookById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const addBook = async (book) => {
  const response = await axios.post(API_URL, book);
  return response.data;
};

import axios from 'axios';

const API_URL = '/api/reviews';

export const getReviewsByBookId = async (bookId) => {
  const response = await axios.get(`/api/books/${bookId}/reviews`);
  return response.data;
};

export const addReview = async (bookId, review) => {
  const response = await axios.post(`/api/books/${bookId}/reviews`, review);
  return response.data;
};

import React, { useEffect, useState } from 'react';
import { getReviewsByBookId } from '../services/reviews';

const ReviewList = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsData = await getReviewsByBookId(bookId);
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error fetching reviews:', error.message);
      }
    };

    fetchReviews();
  }, [bookId]);

  return (
    <div>
      <h2>Recenzii</h2>
      {reviews.length === 0 ? (
        <p>Nu există recenzii pentru această carte.</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p><strong>{review.user_name}:</strong> {review.comment}</p>
              <p><strong>Rating:</strong> {review.rating}/5</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewList;

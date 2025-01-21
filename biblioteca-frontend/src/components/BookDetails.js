import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById } from '../services/books';
import { getReviewsByBookId } from '../services/reviews';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const bookData = await getBookById(id);
        const reviewsData = await getReviewsByBookId(id);
        setBook(bookData);
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error fetching details:', error.message);
      }
    };

    fetchDetails();
  }, [id]);

  if (!book) return <p>Se încarcă...</p>;

  return (
    <div>
      <h1>{book.title}</h1>
      <p><strong>Autor:</strong> {book.author}</p>
      <p>{book.description}</p>
      <h2>Recenzii:</h2>
      {reviews.length === 0 ? (
        <p>Nu există recenzii.</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p><strong>{review.user_name}:</strong> {review.comment}</p>
              <p>Rating: {review.rating}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookDetails;

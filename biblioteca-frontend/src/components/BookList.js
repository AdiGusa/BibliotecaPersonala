import React, { useEffect, useState } from 'react';
import { getBooks } from '../services/books';
import { Link } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await getBooks();
        setBooks(booksData);
      } catch (error) {
        console.error('Error fetching books:', error.message);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Biblioteca Personală</h1>
      {books.length === 0 ? (
        <p>Nu există cărți adăugate.</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <Link to={`/books/${book.id}`}>{book.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;

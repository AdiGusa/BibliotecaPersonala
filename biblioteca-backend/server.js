const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Importă rutele
const booksRouter = require('./routes/books');
const reviewsRouter = require('./routes/reviews');

app.use('/api/books', booksRouter);
app.use('/api', reviewsRouter); // Reviews folosește calea relativă "/books/:bookId/reviews"

// Pornire server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const express = require('express');
const db = require('../database');
const router = express.Router();

// Obține toate recenziile pentru o carte
router.get('/books/:bookId/reviews', (req, res) => {
  const { bookId } = req.params;
  db.all('SELECT * FROM reviews WHERE book_id = ?', [bookId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Creează o recenzie
router.post('/books/:bookId/reviews', (req, res) => {
  const { bookId } = req.params;
  const { user_name, rating, comment } = req.body;

  if (!user_name || !rating) {
    res.status(400).json({ error: 'User name and rating are required' });
    return;
  }

  db.run(
    'INSERT INTO reviews (book_id, user_name, rating, comment) VALUES (?, ?, ?, ?)',
    [bookId, user_name, rating, comment],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ id: this.lastID });
      }
    }
  );
});

// Obține o recenzie după ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM reviews WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res.status(404).json({ message: 'Review not found' });
    } else {
      res.json(row);
    }
  });
});

// Actualizează o recenzie
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { user_name, rating, comment } = req.body;

  db.run(
    'UPDATE reviews SET user_name = ?, rating = ?, comment = ? WHERE id = ?',
    [user_name, rating, comment, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (this.changes === 0) {
        res.status(404).json({ message: 'Review not found' });
      } else {
        res.json({ message: 'Review updated successfully' });
      }
    }
  );
});

// Șterge o recenzie
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM reviews WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ message: 'Review not found' });
    } else {
      res.json({ message: 'Review deleted successfully' });
    }
  });
});

module.exports = router;

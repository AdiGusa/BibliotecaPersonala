const express = require('express');
const db = require('../database');
const router = express.Router();

// Obține toate cărțile
router.get('/', (req, res) => {
  db.all('SELECT * FROM books', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Obține o carte după ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM books WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res.status(404).json({ message: 'Book not found' });
    } else {
      res.json(row);
    }
  });
});

// Creează o carte
router.post('/', (req, res) => {
  const { title, author, isbn, description, thumbnail } = req.body;
  db.run(
    'INSERT INTO books (title, author, isbn, description, thumbnail) VALUES (?, ?, ?, ?, ?)',
    [title, author, isbn, description, thumbnail],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ id: this.lastID });
      }
    }
  );
});

// Actualizează o carte
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, author, isbn, description, thumbnail } = req.body;
  db.run(
    'UPDATE books SET title = ?, author = ?, isbn = ?, description = ?, thumbnail = ? WHERE id = ?',
    [title, author, isbn, description, thumbnail, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (this.changes === 0) {
        res.status(404).json({ message: 'Book not found' });
      } else {
        res.json({ message: 'Book updated successfully' });
      }
    }
  );
});

// Șterge o carte
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM books WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ message: 'Book not found' });
    } else {
      res.json({ message: 'Book deleted successfully' });
    }
  });
});

module.exports = router;

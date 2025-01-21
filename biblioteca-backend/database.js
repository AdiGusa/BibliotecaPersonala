const sqlite3 = require('sqlite3').verbose();

// Conectează-te la baza de date sau creeaz-o dacă nu există
const db = new sqlite3.Database('./biblioteca.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');

    // Creează tabelele
    db.run(`
      CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        isbn TEXT,
        description TEXT,
        thumbnail TEXT
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        book_id INTEGER NOT NULL,
        user_name TEXT NOT NULL,
        rating INTEGER NOT NULL,
        comment TEXT,
        FOREIGN KEY (book_id) REFERENCES books (id)
      )
    `);
  }
});

module.exports = db;

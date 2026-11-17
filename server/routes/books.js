const express = require('express');
const store = require('../store');

const router = express.Router();
const STATUSES = ['To Read', 'Reading', 'Finished'];

// Validation middleware for POST and PUT
function validateBook(req, res, next) {
  const { title, author, status, rating } = req.body;
  const isCreate = req.method === 'POST';

  if (isCreate && (!title || !author)) {
    return res.status(400).json({ error: 'title and author are required' });
  }
  if (title !== undefined && String(title).trim().length < 3) {
    return res.status(400).json({ error: 'title must be at least 3 characters' });
  }
  if (author !== undefined && String(author).trim().length < 2) {
    return res.status(400).json({ error: 'author must be at least 2 characters' });
  }
  if (status !== undefined && !STATUSES.includes(status)) {
    return res.status(400).json({ error: 'status must be To Read, Reading or Finished' });
  }
  if (rating !== undefined && !(Number(rating) >= 0 && Number(rating) <= 5)) {
    return res.status(400).json({ error: 'rating must be between 0 and 5' });
  }
  next();
}

// GET /api/books?status=Reading&genre=Fiction&search=code
router.get('/', (req, res) => {
  const { status, genre, search } = req.query;
  let books = store.getAll();
  if (status) books = books.filter((b) => b.status === status);
  if (genre) books = books.filter((b) => b.genre === genre);
  if (search) {
    const q = search.toLowerCase();
    books = books.filter(
      (b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
    );
  }
  books.sort((a, b) => a.title.localeCompare(b.title));
  res.json(books);
});

// GET /api/books/stats  (must be declared before /:id)
router.get('/stats', (req, res) => {
  const books = store.getAll();
  const count = (s) => books.filter((b) => b.status === s).length;
  const rated = books.filter((b) => b.rating > 0);
  const avgRating = rated.length
    ? Math.round((rated.reduce((sum, b) => sum + b.rating, 0) / rated.length) * 10) / 10
    : 0;
  const finished = count('Finished');
  res.json({
    total: books.length,
    toRead: count('To Read'),
    reading: count('Reading'),
    finished,
    avgRating,
    progress: books.length ? Math.round((finished / books.length) * 100) : 0,
    genres: [...new Set(books.map((b) => b.genre))].sort(),
  });
});

router.get('/:id', (req, res) => {
  const book = store.getById(Number(req.params.id));
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
});

router.post('/', validateBook, (req, res) => {
  res.status(201).json(store.create(req.body));
});

router.put('/:id', validateBook, (req, res) => {
  const book = store.update(Number(req.params.id), req.body);
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
});

router.delete('/:id', (req, res) => {
  if (!store.remove(Number(req.params.id))) {
    return res.status(404).json({ error: 'Book not found' });
  }
  res.json({ message: 'Book deleted' });
});

module.exports = router;

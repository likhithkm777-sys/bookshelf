const store = require('./store');

const now = new Date().toISOString();
const books = [
  ['Clean Code', 'Robert C. Martin', 'Programming', 'Finished', 5],
  ['The Pragmatic Programmer', 'Andrew Hunt', 'Programming', 'Reading', 0],
  ['Atomic Habits', 'James Clear', 'Self-Help', 'Finished', 4],
  ['Wings of Fire', 'A. P. J. Abdul Kalam', 'Biography', 'Finished', 5],
  ['Deep Work', 'Cal Newport', 'Self-Help', 'To Read', 0],
  ['Designing Data-Intensive Applications', 'Martin Kleppmann', 'Programming', 'To Read', 0],
  ['The Alchemist', 'Paulo Coelho', 'Fiction', 'Reading', 0],
  ['Sapiens', 'Yuval Noah Harari', 'History', 'To Read', 0],
].map(([title, author, genre, status, rating], i) => ({
  id: i + 1, title, author, genre, status, rating, createdAt: now,
}));

store.reset(books);
console.log(`Seeded ${books.length} books into data/books.json`);

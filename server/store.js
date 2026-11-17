const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, 'data', 'books.json');

function read() {
  try {
    return JSON.parse(fs.readFileSync(FILE, 'utf8'));
  } catch {
    return { nextId: 1, books: [] };
  }
}

function write(data) {
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

module.exports = {
  getAll: () => read().books,
  getById: (id) => read().books.find((b) => b.id === id),
  create(fields) {
    const data = read();
    const book = {
      id: data.nextId++,
      title: fields.title.trim(),
      author: fields.author.trim(),
      genre: (fields.genre || 'General').trim(),
      status: fields.status || 'To Read',
      rating: Number(fields.rating) || 0,
      createdAt: new Date().toISOString(),
    };
    data.books.push(book);
    write(data);
    return book;
  },
  update(id, fields) {
    const data = read();
    const book = data.books.find((b) => b.id === id);
    if (!book) return null;
    for (const key of ['title', 'author', 'genre', 'status']) {
      if (fields[key] !== undefined) book[key] = String(fields[key]).trim();
    }
    if (fields.rating !== undefined) book.rating = Number(fields.rating) || 0;
    write(data);
    return book;
  },
  remove(id) {
    const data = read();
    const before = data.books.length;
    data.books = data.books.filter((b) => b.id !== id);
    write(data);
    return data.books.length < before;
  },
  reset(books) {
    write({ nextId: books.length + 1, books });
  },
};

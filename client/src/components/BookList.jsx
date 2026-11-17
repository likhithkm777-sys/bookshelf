function BookItem({ book, onStatus, onEdit, onDelete }) {
  return (
    <li className="book">
      <div className="info">
        <strong>{book.title}</strong>
        <span>{book.author} · {book.genre}</span>
      </div>
      <span className="rating">{book.rating ? '★'.repeat(book.rating) : ''}</span>
      <select
        className={`badge ${book.status.replace(' ', '-').toLowerCase()}`}
        value={book.status}
        onChange={(e) => onStatus(book, e.target.value)}
        aria-label={`Status of ${book.title}`}
      >
        <option>To Read</option>
        <option>Reading</option>
        <option>Finished</option>
      </select>
      <button onClick={() => onEdit(book)}>Edit</button>
      <button className="danger" onClick={() => onDelete(book)}>Delete</button>
    </li>
  );
}

export default function BookList({ books, onStatus, onEdit, onDelete }) {
  if (books.length === 0) {
    return <p className="empty">No books match. Add one using the form.</p>;
  }
  return (
    <ul className="books">
      {books.map((b) => (
        <BookItem key={b.id} book={b} onStatus={onStatus} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  );
}

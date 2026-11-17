import { useState } from 'react';

const EMPTY = { title: '', author: '', genre: '', status: 'To Read', rating: 0 };

export default function BookForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || EMPTY);
  const [error, setError] = useState('');

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (form.title.trim().length < 3) return setError('Title must be at least 3 characters');
    if (form.author.trim().length < 2) return setError('Author must be at least 2 characters');
    setError('');
    onSave({ ...form, rating: Number(form.rating) });
    if (!initial) setForm(EMPTY);
  };

  return (
    <form className="panel form" onSubmit={submit}>
      <h2>{initial ? 'Edit book' : 'Add a book'}</h2>

      <label>Title
        <input name="title" value={form.title} onChange={change} placeholder="e.g. Clean Code" />
      </label>
      <label>Author
        <input name="author" value={form.author} onChange={change} placeholder="e.g. Robert C. Martin" />
      </label>
      <label>Genre
        <input name="genre" value={form.genre} onChange={change} placeholder="e.g. Programming" />
      </label>
      <label>Status
        <select name="status" value={form.status} onChange={change}>
          <option>To Read</option>
          <option>Reading</option>
          <option>Finished</option>
        </select>
      </label>
      <label>Rating (0–5)
        <input type="number" name="rating" min="0" max="5" value={form.rating} onChange={change} />
      </label>

      {error && <p className="error">{error}</p>}
      <button type="submit" className="primary">{initial ? 'Save changes' : 'Add book'}</button>
      {initial && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
}

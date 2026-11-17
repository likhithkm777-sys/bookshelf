import { useState, useEffect, useCallback } from 'react';
import { api } from './api';
import StatsBar from './components/StatsBar';
import BookForm from './components/BookForm';
import FilterBar from './components/FilterBar';
import BookList from './components/BookList';

export default function App() {
  const [books, setBooks] = useState([]);
  const [stats, setStats] = useState(null);
  const [filters, setFilters] = useState({ status: '', genre: '', search: '' });
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState('');

  const loadData = useCallback(async () => {
    try {
      const [list, summary] = await Promise.all([api.list(filters), api.stats()]);
      setBooks(list);
      setStats(summary);
    } catch (err) {
      setMessage('Could not reach the server: ' + err.message);
    }
  }, [filters]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const flash = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(''), 2500);
  };

  const handleSave = async (book) => {
    try {
      if (editing) {
        await api.update(editing.id, book);
        flash('Book updated');
        setEditing(null);
      } else {
        await api.create(book);
        flash('Book added');
      }
      loadData();
    } catch (err) {
      flash('Error: ' + err.message);
    }
  };

  const handleStatus = async (book, status) => {
    try {
      await api.update(book.id, { status });
      loadData();
    } catch (err) {
      flash('Error: ' + err.message);
    }
  };

  const handleDelete = async (book) => {
    if (!window.confirm(`Delete "${book.title}"?`)) return;
    try {
      await api.remove(book.id);
      flash('Book deleted');
      if (editing && editing.id === book.id) setEditing(null);
      loadData();
    } catch (err) {
      flash('Error: ' + err.message);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>BookShelf</h1>
          <p>Personal library register · React + Express.js</p>
        </div>
        {stats && (
          <div className="ring" style={{ '--p': stats.progress }}>
            <span>{stats.progress}%</span>
          </div>
        )}
      </header>

      {message && <div className="toast">{message}</div>}
      <StatsBar stats={stats} />

      <main className="layout">
        <BookForm
          key={editing ? editing.id : 'new'}
          initial={editing}
          onSave={handleSave}
          onCancel={() => setEditing(null)}
        />
        <section className="panel">
          <FilterBar filters={filters} setFilters={setFilters} genres={stats ? stats.genres : []} />
          <BookList books={books} onStatus={handleStatus} onEdit={setEditing} onDelete={handleDelete} />
        </section>
      </main>
    </div>
  );
}

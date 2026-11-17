async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export const api = {
  list: (filters) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => v && params.set(k, v));
    return request(`/api/books?${params.toString()}`);
  },
  stats: () => request('/api/books/stats'),
  create: (book) => request('/api/books', { method: 'POST', body: JSON.stringify(book) }),
  update: (id, book) => request(`/api/books/${id}`, { method: 'PUT', body: JSON.stringify(book) }),
  remove: (id) => request(`/api/books/${id}`, { method: 'DELETE' }),
};

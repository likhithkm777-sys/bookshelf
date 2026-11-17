export default function FilterBar({ filters, setFilters, genres }) {
  const change = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });
  return (
    <div className="filters">
      <input name="search" value={filters.search} onChange={change} placeholder="Search title or author" />
      <select name="status" value={filters.status} onChange={change}>
        <option value="">All statuses</option>
        <option>To Read</option>
        <option>Reading</option>
        <option>Finished</option>
      </select>
      <select name="genre" value={filters.genre} onChange={change}>
        <option value="">All genres</option>
        {genres.map((g) => <option key={g}>{g}</option>)}
      </select>
    </div>
  );
}

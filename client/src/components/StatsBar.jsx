export default function StatsBar({ stats }) {
  if (!stats) return null;
  const cards = [
    ['Total books', stats.total, 'blue'],
    ['To read', stats.toRead, 'amber'],
    ['Reading', stats.reading, 'violet'],
    ['Finished', stats.finished, 'green'],
    ['Avg rating', stats.avgRating || '–', 'rose'],
  ];
  return (
    <div className="stats">
      {cards.map(([label, value, color]) => (
        <div key={label} className={`stat ${color}`}>
          <strong>{value}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

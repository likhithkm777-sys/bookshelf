const express = require('express');
const cors = require('cors');
const path = require('path');
const bookRoutes = require('./routes/books');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Custom request logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode} (${Date.now() - start} ms)`);
  });
  next();
});

app.get('/api/health', (req, res) => res.json({ status: 'ok', time: new Date() }));
app.use('/api/books', bookRoutes);

// Unknown API route -> 404
app.use('/api', (req, res) => res.status(404).json({ error: 'Route not found' }));

// Serve the React production build
const clientBuild = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientBuild));
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(clientBuild, 'index.html'));
});

// Central error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => console.log(`BookShelf API running at http://localhost:${PORT}`));

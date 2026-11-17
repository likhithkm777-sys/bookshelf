# BookShelf – Personal Library Register

A full-stack single-page app: **React (Vite)** frontend + **Express.js** REST API with JSON-file persistence.

## Features
- Add, view, edit, delete books (title, author, genre, status, rating)
- Change status (To Read / Reading / Finished) straight from the list
- Dashboard: totals per status, average rating, completion ring
- Server-side search and filtering by status and genre
- Validation on both client and server; logging and error-handling middleware

## Run (development)
```bash
cd server && npm install && npm run seed && npm start      # API on :5000
cd client && npm install && npm run dev                    # UI on :5173 (proxies /api)
```

## Run (single server)
```bash
cd client && npm install && npm run build
cd ../server && npm install && npm start                   # open http://localhost:5000
```

## API
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/books?status=&genre=&search= | List books (filtered, sorted by title) |
| GET | /api/books/stats | Counts, average rating, progress %, genres |
| GET | /api/books/:id | One book (404 if missing) |
| POST | /api/books | Create (201 / 400) |
| PUT | /api/books/:id | Update fields or status |
| DELETE | /api/books/:id | Delete |

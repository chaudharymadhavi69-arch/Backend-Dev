// RESTful Books API with Express.js
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// In-memory database (array)
let books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
  { id: 2, title: '1984', author: 'George Orwell', year: 1949 },
  { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 }
];
let nextId = 4; // Counter for generating new IDs

// Exercise 2: Input validation middleware for year
function validateBook(req, res, next) {
  const { title, author, year } = req.body;
  if (!title || !author || !year) {
    return res.status(400).json({ error: 'Title, author, and year are required' });
  }
  if (typeof year !== 'number' || year < 1000 || year > new Date().getFullYear()) {
    return res.status(400).json({ error: 'Year must be a valid number between 1000 and current year' });
  }
  next();
}

// Exercise 1 & 3: GET all books with filtering and pagination
app.get('/api/books', (req, res) => {
  let { author, year, page = 1, limit = 10 } = req.query;
  let filtered = books;
  if (author) filtered = filtered.filter(b => b.author.toLowerCase().includes(author.toLowerCase()));
  if (year) filtered = filtered.filter(b => b.year == year);
  // Pagination
  page = parseInt(page);
  limit = parseInt(limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = filtered.slice(start, end);
  res.json({ total: filtered.length, page, limit, books: paginated });
});

// Exercise 5: Search books by title
app.get('/api/books/search', (req, res) => {
  const { title } = req.query;
  if (!title) return res.status(400).json({ error: 'Title query required' });
  const results = books.filter(b => b.title.toLowerCase().includes(title.toLowerCase()));
  res.json(results);
});

// GET a single book by ID
app.get('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) return res.status(404).json({ error: 'Book not found' });
  res.json(book);
});

// CREATE a new book
app.post('/api/books', validateBook, (req, res) => {
  const { title, author, year } = req.body;
  const newBook = { id: nextId++, title, author, year };
  books.push(newBook);
  res.status(201).json(newBook);
});

// UPDATE (PUT) entire book
app.put('/api/books/:id', validateBook, (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === id);
  if (bookIndex === -1) return res.status(404).json({ error: 'Book not found' });
  const { title, author, year } = req.body;
  books[bookIndex] = { id, title, author, year };
  res.json(books[bookIndex]);
});

// UPDATE (PATCH) partial book
app.patch('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === id);
  if (bookIndex === -1) return res.status(404).json({ error: 'Book not found' });
  const { title, author, year } = req.body;
  if (title) books[bookIndex].title = title;
  if (author) books[bookIndex].author = author;
  if (year) {
    if (typeof year !== 'number' || year < 1000 || year > new Date().getFullYear()) {
      return res.status(400).json({ error: 'Year must be a valid number between 1000 and current year' });
    }
    books[bookIndex].year = year;
  }
  res.json(books[bookIndex]);
});

// DELETE a book
app.delete('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === id);
  if (bookIndex === -1) return res.status(404).json({ error: 'Book not found' });
  const deletedBook = books.splice(bookIndex, 1)[0];
  res.json({ message: 'Book deleted successfully', book: deletedBook });
});

// Exercise 4: CRUD for authors
let authors = [
  { id: 1, name: 'F. Scott Fitzgerald' },
  { id: 2, name: 'George Orwell' },
  { id: 3, name: 'Harper Lee' }
];
let nextAuthorId = 4;

// GET all authors
app.get('/api/authors', (req, res) => {
  res.json(authors);
});
// GET author by ID
app.get('/api/authors/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const author = authors.find(a => a.id === id);
  if (!author) return res.status(404).json({ error: 'Author not found' });
  res.json(author);
});
// CREATE author
app.post('/api/authors', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  const newAuthor = { id: nextAuthorId++, name };
  authors.push(newAuthor);
  res.status(201).json(newAuthor);
});
// UPDATE author
app.put('/api/authors/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  const authorIndex = authors.findIndex(a => a.id === id);
  if (authorIndex === -1) return res.status(404).json({ error: 'Author not found' });
  if (!name) return res.status(400).json({ error: 'Name is required' });
  authors[authorIndex].name = name;
  res.json(authors[authorIndex]);
});
// DELETE author
app.delete('/api/authors/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const authorIndex = authors.findIndex(a => a.id === id);
  if (authorIndex === -1) return res.status(404).json({ error: 'Author not found' });
  const deletedAuthor = authors.splice(authorIndex, 1)[0];
  res.json({ message: 'Author deleted successfully', author: deletedAuthor });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});
// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
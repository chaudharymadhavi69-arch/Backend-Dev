'use strict';

const express = require('express');
const app = express();
const PORT = 8000;

// In-memory students data
const students = [
  { id: 2, name: 'raj', branch: 'cse' },
  { id: 4, name: 'Kishan', branch: 'ec' },
  { id: 3, name: 'Kashyap', branch: 'dep' },
  { id: 7, name: 'Rohit', branch: 'cld' },
  { id: 8, name: 'kunal', branch: 'dep' }
];

// Root
app.get('/', (req, res) => {
  res.send('<h1>Welcome to home page</h1>');
});

// Get all students
app.get('/students', (req, res) => {
  res.json(students);
});

// Get student by id
app.get('/students/:id', (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).send('invalid id');

  const student = students.find((s) => s.id === id);
  if (!student) return res.status(404).send('data not found');

  res.json(student);
});

// Get students by branch
app.get('/students/branch/:branch', (req, res) => {
  const branch = req.params.branch.toLowerCase();
  const matches = students.filter((s) => s.branch.toLowerCase() === branch);
  if (matches.length === 0) return res.status(404).send('data not found');
  res.json(matches);
});

app.listen(PORT, () => {
  console.log(`server is running on port:${PORT} (pid: ${process.pid})`);
});

// Diagnostic handlers to capture unexpected exits or errors
process.on('exit', (code) => console.log('Process exit event, code:', code));
process.on('uncaughtException', (err) => {
  console.error('uncaughtException:', err);
});
process.on('unhandledRejection', (reason) => {
  console.error('unhandledRejection:', reason);
});
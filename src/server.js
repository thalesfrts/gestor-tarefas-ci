const express = require('express');
const path = require('path');
const { listTasks, addTask, toggleTask, deleteTask } = require('./tasks');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/tasks', (req, res) => {
  res.json(listTasks());
});

app.post('/api/tasks', (req, res) => {
  try {
    const task = addTask(req.body.title);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.patch('/api/tasks/:id', (req, res) => {
  try {
    const task = toggleTask(req.params.id);
    res.json(task);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

app.delete('/api/tasks/:id', (req, res) => {
  try {
    const removed = deleteTask(req.params.id);
    res.json(removed);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

module.exports = app;
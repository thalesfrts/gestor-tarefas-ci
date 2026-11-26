let tasks = [];
let nextId = 1;

function listTasks() {
  return tasks;
}

function addTask(title) {
  if (!title || typeof title !== 'string' || title.trim() === '') {
    throw new Error('O título da tarefa é obrigatório.');
  }
  const task = { id: nextId++, title: title.trim(), done: false };
  tasks.push(task);
  return task;
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === Number(id));
  if (!task) {
    throw new Error('Tarefa não encontrada.');
  }
  task.done = !task.done;
  return task;
}

function deleteTask(id) {
  const index = tasks.findIndex((t) => t.id === Number(id));
  if (index === -1) {
    throw new Error('Tarefa não encontrada.');
  }
  return tasks.splice(index, 1)[0];
}

function resetTasks() {
  tasks = [];
  nextId = 1;
}

module.exports = { listTasks, addTask, toggleTask, deleteTask, resetTasks };
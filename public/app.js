function isValidTitle(title) {
  return typeof title === 'string' && title.trim().length > 0;
}

function renderTasks(tasks, listElement) {
  listElement.innerHTML = '';

  if (tasks.length === 0) {
    const empty = document.createElement('li');
    empty.textContent = 'Nenhuma tarefa cadastrada.';
    listElement.appendChild(empty);
    return;
  }

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.textContent = task.done ? `✅ ${task.title}` : `⬜ ${task.title}`;
    li.dataset.id = task.id;
    listElement.appendChild(li);
  });
}

async function loadTasks() {
  const res = await fetch('/api/tasks');
  const tasks = await res.json();
  const listElement = document.getElementById('task-list');
  if (listElement) renderTasks(tasks, listElement);
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    const input = document.getElementById('task-input');
    const errorMsg = document.getElementById('error-msg');
    const listElement = document.getElementById('task-list');

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!isValidTitle(input.value)) {
          errorMsg.textContent = 'Digite um título válido.';
          return;
        }
        errorMsg.textContent = '';
        await fetch('/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: input.value }),
        });
        input.value = '';
        await loadTasks();
      });
    }

    if (listElement) {
      listElement.addEventListener('click', async (e) => {
        const id = e.target.dataset.id;
        if (!id) return;
        await fetch(`/api/tasks/${id}`, { method: 'PATCH' });
        await loadTasks();
      });
      loadTasks();
    }
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { isValidTitle, renderTasks };
}
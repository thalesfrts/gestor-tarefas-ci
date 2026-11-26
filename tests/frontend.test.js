/**
 * @jest-environment jsdom
 */
const fs = require('fs');
const path = require('path');
const { isValidTitle, renderTasks } = require('../public/app');

describe('Frontend - Testes de Interface e Validação', () => {
  beforeEach(() => {
    const html = fs.readFileSync(path.join(__dirname, '..', 'public', 'index.html'), 'utf8');
    document.documentElement.innerHTML = html;
  });

  test('deve aceitar título preenchido e rejeitar vazio', () => {
    expect(isValidTitle('Estudar Jest')).toBe(true);
    expect(isValidTitle('')).toBe(false);
    expect(isValidTitle('   ')).toBe(false);
  });

  test('deve exibir aviso quando não houver tarefas', () => {
    const list = document.getElementById('task-list');
    renderTasks([], list);
    expect(list.children).toHaveLength(1);
    expect(list.textContent).toContain('Nenhuma tarefa cadastrada.');
  });

  test('deve renderizar tarefas pendentes e concluídas na lista', () => {
    const list = document.getElementById('task-list');
    renderTasks(
      [
        { id: 1, title: 'Criar repositório', done: false },
        { id: 2, title: 'Rodar pipeline', done: true },
      ],
      list
    );

    expect(list.children).toHaveLength(2);
    expect(list.children[0].textContent).toContain('⬜ Criar repositório');
    expect(list.children[1].textContent).toContain('✅ Rodar pipeline');
  });
});
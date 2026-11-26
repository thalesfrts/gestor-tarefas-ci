const { listTasks, addTask, toggleTask, deleteTask, resetTasks } = require('../src/tasks');

describe('Backend - Testes de Unidade (Tarefas)', () => {
  beforeEach(() => {
    resetTasks();
  });

  test('deve adicionar uma tarefa válida', () => {
    const task = addTask('Configurar CI/CD');
    expect(task).toEqual({ id: 1, title: 'Configurar CI/CD', done: false });
    expect(listTasks()).toHaveLength(1);
  });

  test('deve lançar erro ao adicionar tarefa sem título', () => {
    expect(() => addTask('')).toThrow('O título da tarefa é obrigatório.');
    expect(() => addTask('   ')).toThrow('O título da tarefa é obrigatório.');
  });

  test('deve alternar o status de conclusão da tarefa', () => {
    const task = addTask('Escrever testes');
    const updated = toggleTask(task.id);
    expect(updated.done).toBe(true);
  });

  test('deve remover uma tarefa existente', () => {
    const task = addTask('Fazer deploy');
    deleteTask(task.id);
    expect(listTasks()).toHaveLength(0);
  });

  test('deve lançar erro ao tentar remover tarefa inexistente', () => {
    expect(() => deleteTask(999)).toThrow('Tarefa não encontrada.');
  });
});
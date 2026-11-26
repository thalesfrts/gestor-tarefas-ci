# Gerenciador de Tarefas - Testes Automatizados e CI/CD

Projeto web desenvolvido em Node.js (Express) e JavaScript puro para a atividade prática da disciplina de Desenvolvimento Web para Nuvem (UERN).

## Funcionalidades
- Listagem, criação e alteração de status de tarefas via API REST e interface web.

## Como executar localmente
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor:
   ```bash
   npm start
   ```
3. Acesse `http://localhost:3000`.

## Como executar os testes
```bash
npm test
```
- **Backend (`tests/backend.test.js`):** testes de unidade com Jest para criação, validação, atualização e remoção de tarefas.
- **Frontend (`tests/frontend.test.js`):** testes com Jest + JSDOM para validação de entrada e renderização da lista no DOM.

## Pipeline CI/CD
Configurado via GitHub Actions (`.github/workflows/ci-cd.yml`):
1. Instala as dependências (`npm install`).
2. Executa os testes automatizados (`npm test`).
3. Dispara o deploy automático no Render via Deploy Hook apenas se todos os testes passarem.

## Aplicação em produção
- URL: https://gestor-tarefas-ci.onrender.com

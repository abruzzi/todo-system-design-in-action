import {http, HttpResponse} from 'msw'

import todos from './todos.json';
let nextId = todos.length + 1;

export const handlers = [
  http.get('/api/todos', ({ request }) => {
    const url = new URL(request.url)
    const offset = Number(url.searchParams.get('offset')) || 0;
    const limit = Number(url.searchParams.get('limit')) || 10;

    console.log('offset:', offset, 'limit:', limit);
    const paginatedTodos = todos.slice(offset, offset + limit);

    return HttpResponse.json({
      todos: paginatedTodos,
      total: todos.length
    });
  }),

  http.post('/api/todos', async ({ request }) => {
    const { text, createdAt, category } = await request.json();
    const newTodo = { id: nextId++, text, createdAt, category };
    todos.push(newTodo);
    return HttpResponse.json(newTodo, { status: 201 })
  }),
]
import {http, HttpResponse} from 'msw'

import todos from './todos.json';
let nextId = todos.length + 1;

export const handlers = [
  http.get('/api/todos', () => {
    return HttpResponse.json(todos)
  }),

  http.post('/api/todos', async ({ request }) => {
    const { text } = await request.json();
    const newTodo = { id: nextId++, text, completed: false };
    todos.push(newTodo);
    return HttpResponse.json(newTodo, { status: 201 })
  }),
]
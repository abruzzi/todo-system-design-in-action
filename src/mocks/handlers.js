import {http, HttpResponse} from 'msw'

import todos from './todos.json';

export const handlers = [
  http.get('/posts', () => {
    return HttpResponse.json(todos)
  }),
]
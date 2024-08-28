import axios from "axios";
import { Todo } from "./types.ts";

export const getTodos = async (offset: number = 0, limit: number = 10): Promise<{ todos: Todo[], total: number }> => {
  const response = await axios.get('/api/todos', {
    params: { offset, limit }
  });
  return response.data;
};

export const postTodo = async (newTodo: Todo): Promise<Todo> => {
  const response = await axios.post('/api/todos', newTodo);
  return response.data;
};

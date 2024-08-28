import axios from "axios";
import { Todo } from "./types.ts";

export const getTodos = async (): Promise<Todo[]> => {
  const response = await axios.get('/api/todos');
  return response.data;
};

export const postTodo = async (newTodo: Todo): Promise<Todo> => {
  const response = await axios.post('/api/todos', newTodo);
  return response.data;
};

import { Todo } from "./types.ts";

export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch("/api/posts");
  return await response.json();
};

export const postTodo = async () => {};

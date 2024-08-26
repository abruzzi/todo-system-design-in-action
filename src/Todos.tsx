import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTodos, postTodo } from "./api.ts";
import { Todo } from "./types.ts";

export const Todos = () => {
  const queryClient = useQueryClient();

  const query = useQuery<Todo[]>({ queryKey: ["todos"], queryFn: getTodos });

  const mutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  console.log(query.data);

  return (
    <div>
      <ul>
        {(query.data || []).map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>

      <button
        onClick={() => {
          mutation.mutate({
            text: "Buy some milk",
          });
        }}
      >
        Add Todo
      </button>
    </div>
  );
};

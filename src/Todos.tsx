import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getTodos, postTodo } from "./api.ts";
import { Todo } from "./types.ts";
import { useEffect, useRef, useState } from "react";
import { TodoCategory } from "./types.ts";

const categoryColors: Record<TodoCategory, string> = {
  Personal: "bg-blue-100 text-blue-800",
  Work: "bg-green-100 text-green-800",
  Health: "bg-red-100 text-red-800",
  Learning: "bg-purple-100 text-purple-800",
  Finance: "bg-yellow-100 text-yellow-800",
};

export const Todos = () => {
  const [newTodoText, setNewTodoText] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: todos = [] } = useQuery<Todo[]>({ queryKey: ["todos"], queryFn: getTodos });

  const mutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleAddTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(newTodoText.trim() === '') return;

    const newTodo = {
      id: 1,
      text: newTodoText.trim(),
      createdAt: new Date().toISOString(),
      category: TodoCategory.Personal,
      priority: 1
    };

    if (e.key === 'Enter') {
      mutation.mutate(newTodo);
      setNewTodoText('');
      setIsAdding(false);
    } else if (e.key === 'Escape') {
      setNewTodoText('');
      setIsAdding(false);
    }
  };

  const handleBlur = () => {
    setIsAdding(false);
  };

  useEffect(() => {
    if (isAdding && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAdding]);
  
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center">
          <button className="mr-4">←</button>
          <h1 className="text-xl font-semibold">All my todolists</h1>
        </div>
      </header>
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-hidden flex flex-col">
        <h2 className="text-3xl font-bold mb-6">Tasks</h2>
        <div className="bg-white rounded-lg shadow flex-1 flex flex-col overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold mb-4">My todolist</h3>
            {isAdding ? (
              <input
                ref={inputRef}
                type="text"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                onKeyDown={handleAddTodo}
                onBlur={handleBlur}
                placeholder="Add a new task and press Enter"
                className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <button 
                onClick={() => setIsAdding(true)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                + Add task
              </button>
            )}
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <ul className="space-y-4 p-6">
              {todos.map(todo => (
                <li key={todo.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <p className="font-medium">{todo.text}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${categoryColors[todo.category] || 'bg-gray-100 text-gray-800'}`}>
                          {todo.category}
                        </span>
                        <p className="text-sm text-gray-500">
                          {new Date(todo.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export type User = {
  name: string;
  role: string;
  avatar: string;
};

export enum TodoCategory {
  Personal = "Personal",
  Work = "Work",
  Health = "Health",
  Learning = "Learning",
  Finance = "Finance"
}

export type Todo = {
  id: number,
  text: string,
  category: TodoCategory,
  priority: number,
  createdAt: string;
  assignee?: User,
}
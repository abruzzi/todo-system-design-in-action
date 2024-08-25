/*
    "id": 1,
    "text": "Buy groceries",
    "category": "Personal",
    "priority": 2,
    "assignee": {
      "name": "Alice Johnson",
      "role": "Team Lead",
      "avatar": "https://example.com/avatars/alice.jpg"
    }
 */

export type User = {
  name: string;
  role: string;
  avatar: string;
};

export enum TodoCategory {
  "Personal"
}

export type Todo = {
  "id": number,
  "text": string,
  "category": TodoCategory,
  "priority": 2,
}
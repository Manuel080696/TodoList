import { TODO_FILTERS } from "./const";

export interface Todos {
  id: string;
  title: string;
  completed: boolean;
}

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export type ListOfTodos = Todo[];

export type TodoId = Pick<Todo, "id">;
export type TodoTitle = Pick<Todo, "title">;
export type TodoCompleted = Pick<Todo, "completed">;

export type FilterValue = (typeof TODO_FILTERS)[keyof typeof TODO_FILTERS];

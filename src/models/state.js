import { FILTERS } from "../utils/filter-const";
import { TodoModel } from "./todo";

const state = {
  todos: [
    new TodoModel("Comprar el pan 🍞"),
    new TodoModel("Comerme el pan 🍞"),
    new TodoModel("Beber agua 🫗"),
  ],
  filter: FILTERS.ALL,
};

const STORAGE_KEY = "todos";

const saveToStorage = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos));
};

const loadFromStorage = () => {
  const todos = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (!todos) return;

  state.todos = todos;
};

export const getTodos = () => {
  return state.todos;
};

export const getCurrentFilter = () => {
  return state.filter;
};

export const setFilter = (filter = FILTERS.ALL) => {
  state.filter = filter;
};

export const getTodosByFilter = (filter = FILTERS.ALL) => {
  loadFromStorage();
  switch (filter) {
    case FILTERS.ALL:
      return state.todos;
    case FILTERS.PENDING:
      return state.todos.filter((todo) => !todo.done);
    case FILTERS.COMPLETED:
      return state.todos.filter((todo) => todo.done);
    default:
      throw new Error(`Filtro ${filter} desconocido`);
  }
};

export const addTodo = (description) => {
  if (!description) throw new Error("La descripción no puede estar vacía");
  state.todos.push(new TodoModel(description));
  saveToStorage();
};

export const deleteTodo = (todoId) => {
  if (!todoId) throw new Error(`El data-id ${todoId} no existe`);
  state.todos = state.todos.filter((todo) => todo.id !== todoId);
  console.log(state.todos);
  saveToStorage();
};

export const deleteCompletedTodos = () => {
  state.todos = state.todos.filter((todo) => !todo.done);
  saveToStorage();
};

export const toggleTodo = (todoId) => {
  if (!todoId) throw new Error(`El data-id ${todoId} no existe`);
  let modTodo = state.todos.find((todo) => todo.id === todoId);
  modTodo.done = !modTodo.done;
  saveToStorage();
};

export const getTodosLength = () => {
  const pendingTodosNum = state.todos.filter((todo) => !todo.done);
  return pendingTodosNum.length;
};

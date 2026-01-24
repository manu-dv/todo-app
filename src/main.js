import { initTodoApp, renderTodos } from "./models/ui.js";
import {
  getTodosByFilter,
  addTodo,
  deleteCompletedTodos,
  toggleTodo,
  getCurrentFilter,
  setFilter,
  deleteTodo,
} from "./models/state.js";
import "./styles/style.css";

const rerender = () => {
  renderTodos(".todo-section", getTodosByFilter(getCurrentFilter()));
};

initTodoApp("#app", {
  onNewTodo: (description) => {
    addTodo(description);
    rerender();
  },
  onDeleteCompletedTodos: () => {
    deleteCompletedTodos();
    rerender();
  },
  onToggleTodo: (todoId) => {
    toggleTodo(todoId);
    rerender();
  },
  onSelectFilter: (filter) => {
    setFilter(filter);
    rerender(filter);
  },
  onDeleteTodo: (todoId) => {
    deleteTodo(todoId);
    rerender();
  },
});

rerender();

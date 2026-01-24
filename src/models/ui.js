import html from "../templates/app.html?raw";
import { ELEMENT_ID } from "../utils/element-const";
import { getTodosLength } from "./state";

let onNewTodo = () => {};
let onToggleTodo = () => {};
let onSelectFilter = () => {};
let onDeleteTodo = () => {};
let onDeleteCompletedTodos = () => {};

export const initTodoApp = (elementId, callbacks = {}) => {
  const app = document.querySelector(elementId);
  if (!app) throw new Error(`Elemento ${elementId} no existe`);
  app.innerHTML = html;

  onNewTodo = callbacks.onNewTodo;
  onToggleTodo = callbacks.onToggleTodo;
  onDeleteTodo = callbacks.onDeleteTodo;
  onSelectFilter = callbacks.onSelectFilter;
  onDeleteCompletedTodos = callbacks.onDeleteCompletedTodos;

  initTodoEvents();
};

export const renderTodos = (elementId, todosArr) => {
  const todoContainer = document.querySelector(elementId);
  if (!todoContainer) throw new Error(`Elemento ${elementId} no existe`);
  if (!todosArr) throw new Error("Todos no definido");

  todoContainer.innerHTML = "";

  todosArr.forEach((todo) => {
    const todoDeleteButton = document.createElement("button");
    todoDeleteButton.classList.add("delete-todo");
    todoDeleteButton.innerText = "x";

    const todoSpan = document.createElement("span");
    todoSpan.innerText = todo.description;

    const todoElement = document.createElement("article");
    todoElement.setAttribute("data-id", todo.id);
    todoElement.classList.add("full-todo-element");
    todo.done ? todoElement.classList.add("completed") : "";
    todoElement.append(todoSpan);
    todoElement.append(todoDeleteButton);

    todoContainer.append(todoElement);
  });

  const todoCounter = document.querySelector(ELEMENT_ID.TodoNumber);
  if (!todoCounter) throw new Error(`Elemento ${ELEMENT_ID.TodoNumber} no existe`);
  todoCounter.innerText = getTodosLength();
  
};

const initTodoEvents = () => {
  initToggleEvent();
  initTodoInputEvent();
  initDeleteTodoButton();
  initFilterSelectEvent();
  initDeleteCompletedButtonEvent();
};

const initTodoInputEvent = () => {
  const todoInput = document.querySelector(ELEMENT_ID.TodoInput);
  if (!todoInput)
    throw new Error(`Elemento ${ELEMENT_ID.TodoInput} no encontrado`);

  todoInput.addEventListener("keydown", (event) => {
    if (event.keyCode !== 13) return;
    onNewTodo(event.target.value);
    event.target.value = "";
  });
};

const initDeleteCompletedButtonEvent = () => {
  const deleteCompletedButton = document.querySelector(
    ELEMENT_ID.DeleteCompletedButton,
  );
  if (!deleteCompletedButton)
    throw new Error(
      `Elemento ${ELEMENT_ID.DeleteCompletedButton} no encontrado`,
    );

  deleteCompletedButton.addEventListener("click", () => {
    onDeleteCompletedTodos();
  });
};

const initToggleEvent = () => {
  const todoSection = document.querySelector(ELEMENT_ID.TodoSection);
  if (!todoSection)
    throw new Error(`Elemento ${ELEMENT_ID.TodoSection} no encontrado`);

  todoSection.addEventListener("click", (event) => {
    const fullTodoElement = event.target.closest(".full-todo-element");
    if (!fullTodoElement) return;

    onToggleTodo(fullTodoElement.getAttribute("data-id"));
  });
};

const initFilterSelectEvent = () => {
  const filterSelect = document.querySelector(ELEMENT_ID.FilterSelect);
  if (!filterSelect)
    throw new Error(`Elemento ${ELEMENT_ID.FilterSelect} no encontrado`);

  filterSelect.addEventListener("change", (event) => {
    onSelectFilter(event.target.value);
  });
};

const initDeleteTodoButton = () => {
  const todoSection = document.querySelector(ELEMENT_ID.TodoSection);
  if (!todoSection)
    throw new Error(`Elemento ${ELEMENT_ID.TodoSection} no encontrado`);

  todoSection.addEventListener("click", (event) => {
    if (!event.target.classList.contains("delete-todo")) return;

    const todoElement = event.target.closest(".full-todo-element");
    if (!todoElement) return;

    onDeleteTodo(todoElement.dataset.id);
  });
};

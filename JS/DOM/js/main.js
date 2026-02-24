"use strict";

const todoKeys = {
  id: "id",
  text: "text",
  is_completed: "is_completed",
};

const todos = [];

const errTodoNotFound = (todoId) => `Todo with id ${todoId} not found`;

const getNewTodoId = (todos) =>
  todos.reduce((maxId, todo) => Math.max(maxId, todo[todoKeys.id]), 0) + 1;

const createTodo = (todos, text) => {
  const newTodo = {
    [todoKeys.id]: getNewTodoId(todos),
    [todoKeys.text]: text,
    [todoKeys.is_completed]: false,
  };
  todos.push(newTodo);
  return newTodo;
};

const completeTodoById = (todos, todoId) => {
  const todo = todos.find((todo) => todo[todoKeys.id] === todoId);

  if (!todo) {
    console.error(errTodoNotFound(todoId));
    return null;
  }
  todo[todoKeys.is_completed] = !todo[todoKeys.is_completed];
  return todo;
};

const deleteTodoById = (todos, todoId) => {
  const todoIndex = todos.findIndex((todo) => todo[todoKeys.id] === todoId);
  if (todoIndex === -1) {
    console.error(errTodoNotFound(todoId));
    return todos;
  }
  todos.splice(todoIndex, 1);
  return todos;
};

// При помощи метода querySelector получаем элементы .form, .input и .todos
// Создаем функцию createTodoElement(text), которая будет создавать todo в виде разметки
// Создаем функцию handleCreateTodo(todos, text), которая будет вызывать createTodo и createTodoElement

const form = document.querySelector(".form");
const input = document.querySelector(".input");
const todosContainer = document.querySelector(".todos");

function createTodoElement(text) {
  const li = document.createElement("li");
  li.classList.add("todo");

  const textDiv = document.createElement("div");
  textDiv.classList.add("todo-text");

  const actionsDiv = document.createElement("div");
  actionsDiv.classList.add("todo-actions");

  const completeBtn = document.createElement("button");
  completeBtn.classList.add("button-complete");

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("button-delete");

  actionsDiv.append(completeBtn);
  actionsDiv.append(deleteBtn);
  li.append(textDiv);
  li.append(actionsDiv);
}

function handleCreateTodo(todos, text) {
  const newTodo = createTodo(todos, text);
  const todoElement = createTodoElement(newTodo);
  return todoElement;
}
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_URL = "http://localhost:3000/api/todos";
const todoForm = document.getElementById("todo-form"); // Since it's typescript we need to specify the exact type of each DOM element retrieved
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
// Here we are adding an event listener to the form element (todoForm) to listen for 
// a sumbit event. ie When the Add button is clicked, this function will run
// (e: Event) is the event object e that is passed to the function
todoForm === null || todoForm === void 0 ? void 0 : todoForm.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault(); // Prevents default behavior of form submission, which is to reload page when submitted
    const title = todoInput.value.trim(); // Gets value from input field (todoInput), trim() is used to remove any whitespace
    if (title) {
        const todo = { title }; // Here if statement checks if title is empty
        // Omit<T,K> is used to create a new type that has
        // all the properties of Todo except for "id" and "completed",
        // we do this because when creating a new Todo item, id or completed status
        // is not provided, as they will be handled by the backend. {title} creates new object with just title property
        yield createTodo(todo); // a asynchronous function that sends request to backend by POST to create new items
        todoInput.value = ""; // clears input field
        loadTodos(); // Fetches updated list through GET to update and re-render the todo list
    }
}));
//LoadsTodos fetches a list of todos from fetchTodos then renders it
function loadTodos() {
    return __awaiter(this, void 0, void 0, function* () {
        const todos = yield fetchTodos();
        renderTodos(todos);
    });
}
// This function sends an HTTP request to the server then returns an array of todos parsed from the response
function fetchTodos() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(API_URL);
        const todos = yield response.json();
        return todos;
    });
}
function renderTodos(todos) {
    todoList.innerHTML = '';
    todos.forEach((todo) => {
        const todoElement = createTodoElement(todo);
        todoList.appendChild(todoElement);
    });
}
// This function creates a HTMLDivElement using the todo object passed in
function createTodoElement(todo) {
    const div = document.createElement("div"); // Creates a new div element in the DOM
    div.classList.add("todo"); // Adds CSS class to the todo div
    // Set the innerHTML for the todo element
    div.innerHTML = `
      <span class="${todo.completed ? "completed" : ""}">
        ${todo.title}
      </span>
      <div>
        <button class="complete-btn">
          ${todo.completed ? "Uncomplete" : "Complete"}
        </button>
        <button class="delete-btn">Delete</button>
      </div>
    `;
    // Add event listeners for the buttons programmatically
    const completeButton = div.querySelector(".complete-btn");
    const deleteButton = div.querySelector(".delete-btn");
    // Check if the buttons exist before adding event listeners
    if (deleteButton) {
        deleteButton.addEventListener("click", () => deleteTodo(todo.id));
    }
    if (completeButton) {
        completeButton.addEventListener("click", () => toggleCompleted(todo.id));
    }
    // Add completebutton eventlistener once toggle completed is written
    return div;
}
// Below are all functions that interact with the serverside using (POST,DELETE,GET)
//createTodo sends a POST request to the server to create a new Todo
function createTodo(todo) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(todo), // Convert Todo object to json and send in the request body
            headers: { "Content-Type": "application/json" }, // Specifies that the request body is sent in JSON format
        });
    });
}
// deleteTodo sends a DELETE request to the API endpoint
function deleteTodo(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });
        loadTodos();
    });
}
// New function to ensure complete button functionality
function toggleCompleted(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const todo = yield getTodo(id);
        const updatedTodo = Object.assign(Object.assign({}, todo), { completed: !todo.completed });
        if (updatedTodo.completed) {
            yield deleteTodo(updatedTodo.id);
        }
        else {
            yield updateTodo(todo);
            loadTodos();
        }
    });
}
// getTodo sends a GET request to retrieve a specfic todo with the given ID
function getTodo(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${API_URL}/${id}`);
        const todo = yield response.json(); // Declares a constant todo that will store the parsed JSON Data
        // : Todo is a ts annotation that says todo must match Todo interface
        return todo;
    });
}
function updateTodo(todo) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch(`${API_URL}/${todo.id}`, {
            method: "PUT",
            body: JSON.stringify(todo),
            headers: { "Content-Type": "application/json" },
        });
    });
}

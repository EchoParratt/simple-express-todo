var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var API_URL = "http://localhost:3000/todos";
var todoForm = document.getElementById("todo-form"); // Since it's typescript we need to specify the exact type of each DOM element retrieved
var todoInput = document.getElementById("todo-input");
var todoList = document.getElementById("todo-list");
// Here we are adding an event listener to the form element (todoForm) to listen for 
// a sumbit event. ie When the Add button is clicked, this function will run
// (e: Event) is the event object e that is passed to the function
todoForm === null || todoForm === void 0 ? void 0 : todoForm.addEventListener("submit", function (e) { return __awaiter(_this, void 0, void 0, function () {
    var title, todo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                e.preventDefault(); // Prevents default behavior of form submission, which is to reload page when submitted
                title = todoInput.value.trim() // Gets value from input field (todoInput), trim() is used to remove any whitespace
                ;
                if (!title) return [3 /*break*/, 2];
                todo = { title: title } // Here if statement checks if title is empty
                ;
                // Omit<T,K> is used to create a new type that has
                // all the properties of Todo except for "id" and "completed",
                // we do this because when creating a new Todo item, id or completed status
                // is not provided, as they will be handled by the backend. {title} creates new object with just title property
                return [4 /*yield*/, createTodo(todo)]; // a asynchronous function that sends request to backend by POST to create new items
            case 1:
                // Omit<T,K> is used to create a new type that has
                // all the properties of Todo except for "id" and "completed",
                // we do this because when creating a new Todo item, id or completed status
                // is not provided, as they will be handled by the backend. {title} creates new object with just title property
                _a.sent(); // a asynchronous function that sends request to backend by POST to create new items
                todoInput.value = ""; // clears input field
                loadTodos(); // Fetches updated list through GET to update and re-render the todo list
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); });
//LoadsTodos fetches a list of todos from fetchTodos then renders it
function loadTodos() {
    return __awaiter(this, void 0, void 0, function () {
        var todos;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchTodos()];
                case 1:
                    todos = _a.sent();
                    renderTodos(todos);
                    return [2 /*return*/];
            }
        });
    });
}
// This function sends an HTTP request to the server then returns an array of todos parsed from the response
function fetchTodos() {
    return __awaiter(this, void 0, void 0, function () {
        var response, todos;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(API_URL)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    todos = _a.sent();
                    return [2 /*return*/, todos];
            }
        });
    });
}
function renderTodos(todos) {
    todoList.innerHTML = '';
    todos.forEach(function (todo) {
        var todoElement = createTodoElement(todo);
        todoList.appendChild(todoElement);
    });
}
// This function creates a HTMLDivElement using the todo object passed in
function createTodoElement(todo) {
    var div = document.createElement("div"); // Creates a new div element in the DOM
    div.classList.add("todo"); // Adds CSS class to the todo div
    // Set the innerHTML for the todo element
    div.innerHTML = "\n      <span class=\"".concat(todo.completed ? "completed" : "", "\">\n        ").concat(todo.title, "\n      </span>\n      <div>\n        <button class=\"complete-btn\">\n          ").concat(todo.completed ? "Uncomplete" : "Complete", "\n        </button>\n        <button class=\"delete-btn\">Delete</button>\n      </div>\n    ");
    // Add event listeners for the buttons programmatically
    var completeButton = div.querySelector(".complete-btn");
    var deleteButton = div.querySelector(".delete-btn");
    // Check if the buttons exist before adding event listeners
    if (deleteButton) {
        deleteButton.addEventListener("click", function () { return deleteTodo(todo.id); });
    }
    return div;
}
// Below are all functions that interact with the serverside using (POST,DELETE,GET)
//createTodo sends a POST request to the server to create a new Todo
function createTodo(todo) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(API_URL, {
                        method: "POST",
                        body: JSON.stringify(todo), // Convert Todo object to json and send in the request body
                        headers: { "Content-Type": "application/json" }, // Specifies that the request body is sent in JSON format
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// deleteTodo sends a DELETE request to the API endpoint
function deleteTodo(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("".concat(API_URL, "/").concat(id), {
                        method: "DELETE"
                    })];
                case 1:
                    _a.sent();
                    loadTodos();
                    return [2 /*return*/];
            }
        });
    });
}
// getTodo sends a GET request to retrieve a specfic todo with the given ID
function getTodo(id) {
    return __awaiter(this, void 0, void 0, function () {
        var response, todo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("".concat(API_URL, "/").concat(id))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()
                        // : Todo is a ts annotation that says todo must match Todo interface
                    ]; // Declares a constant todo that will store the parsed JSON Data
                case 2:
                    todo = _a.sent() // Declares a constant todo that will store the parsed JSON Data
                    ;
                    // : Todo is a ts annotation that says todo must match Todo interface
                    return [2 /*return*/, todo];
            }
        });
    });
}
// Didnt add a updateTodo (PUT) since I didnt make one in the backend yet
// might add one later but for now just trying to make a working app

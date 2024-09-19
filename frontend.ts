interface Todo { // This interface defines the structure of a todo object
    id: number;
    title: string;
    completed: boolean;
  }

  const API_URL = "http://localhost:3000/api/todos";
  const todoForm = document.getElementById("todo-form") as HTMLFormElement // Since it's typescript we need to specify the exact type of each DOM element retrieved
  const todoInput = document.getElementById("todo-input") as HTMLInputElement
  const todoList = document.getElementById("todo-list") as HTMLElement

  // Here we are adding an event listener to the form element (todoForm) to listen for 
  // a sumbit event. ie When the Add button is clicked, this function will run
  // (e: Event) is the event object e that is passed to the function
  todoForm?.addEventListener("submit", async (e: Event) => { 
        e.preventDefault() // Prevents default behavior of form submission, which is to reload page when submitted
        const title = todoInput.value.trim() // Gets value from input field (todoInput), trim() is used to remove any whitespace
        if (title) {
            const todo: Omit<Todo, "id" | "completed"> = {title} // Here if statement checks if title is empty
                                                                // Omit<T,K> is used to create a new type that has
                                                                // all the properties of Todo except for "id" and "completed",
                                                                // we do this because when creating a new Todo item, id or completed status
                                                                // is not provided, as they will be handled by the backend. {title} creates new object with just title property
            await createTodo(todo) // a asynchronous function that sends request to backend by POST to create new items
            todoInput.value = "" // clears input field
            loadTodos() // Fetches updated list through GET to update and re-render the todo list
        }
  })
  //LoadsTodos fetches a list of todos from fetchTodos then renders it
  async function loadTodos(): Promise<void> { // Promise<void> does not return any specfic value (just signifies the completion of the function)
    const todos = await fetchTodos();
    renderTodos(todos)
  }
  // This function sends an HTTP request to the server then returns an array of todos parsed from the response
  async function fetchTodos(): Promise<Todo[]> {
    const response = await fetch(API_URL)
    const todos: Todo[] = await response.json()
    return todos
  }

  function renderTodos(todos: Todo[]): void {
    todoList.innerHTML = ''
    todos.forEach((todo) => {
        const todoElement = createTodoElement(todo);
        todoList.appendChild(todoElement)
    })
  }

  // This function creates a HTMLDivElement using the todo object passed in
  function createTodoElement(todo: Todo): HTMLDivElement {
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
    const completeButton = div.querySelector(".complete-btn") as HTMLButtonElement;
    const deleteButton = div.querySelector(".delete-btn") as HTMLButtonElement;
  
    // Check if the buttons exist before adding event listeners
   
  
    if (deleteButton) {
      deleteButton.addEventListener("click", () => deleteTodo(todo.id));
    }

    if (completeButton) {
      completeButton.addEventListener("click", () => toggleCompleted(todo.id))
    }

    // Add completebutton eventlistener once toggle completed is written
  
    return div;
  }
  

    // Below are all functions that interact with the serverside using (POST,DELETE,GET)


    //createTodo sends a POST request to the server to create a new Todo
    async function createTodo(todo: Omit<Todo, "id" | "completed">): Promise<void> {
      await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(todo), // Convert Todo object to json and send in the request body
        headers: {"Content-Type": "application/json"}, // Specifies that the request body is sent in JSON format
      })
    }

    // deleteTodo sends a DELETE request to the API endpoint
    async function deleteTodo(id:number): Promise<void> {
      await fetch(`${API_URL}/${id}`, { // Dynamically creates URL for the request
        method: "DELETE"
      })
      loadTodos()
    }

    async function toggleCompleted(id:number): Promise<void> {
      const todo = await getTodo(id)
      const updatedTodo: Todo = {...todo, completed: !todo.completed}
      if(updatedTodo.completed){
        await deleteTodo(updatedTodo.id)
      }
      else{
        await updateTodo(todo)
      loadTodos()}
    }

    // getTodo sends a GET request to retrieve a specfic todo with the given ID
    async function getTodo(id:number): Promise<Todo> {
      const response = await fetch(`${API_URL}/${id}`)
      const todo: Todo = await response.json() // Declares a constant todo that will store the parsed JSON Data
                                              // : Todo is a ts annotation that says todo must match Todo interface
      return todo
    }

    async function updateTodo(todo: Todo): Promise<void> {
      await fetch(`${API_URL}/${todo.id}`, {
        method: "PUT",
        body: JSON.stringify(todo),
        headers: { "Content-Type": "application/json" },
      });
    }

    // Didnt add a updateTodo (PUT) since I didnt make one in the backend yet
    // might add one later but for now just trying to make a working app


interface Todo { // This interface defines the structure of a todo object
    id: number;
    title: string;
    completed: boolean;
  }

  const API_URL = "http://localhost:3000/todos";
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





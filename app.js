// require dependencies so they can be used throughout this code
const express = require("express");
const bodyParser = require("body-parser");

// Init express.js server and save as a variable (refer to as app)
const app = express();

app.use(bodyParser.json());
let todos = []; // In-memory storage for todos 

// Get endpoint to fetch all todo items 
// "/todos" is the URL endpoint that will be accessed (http://localhost:3000/todos)
//req contains information about the incoming request (e.g., URL parameters, request body, etc.)
//res is used to send a response back to the client    
//res.json is used to send a json response back to the client
// todos is an array of data
app.get("/todos", (req,res) => {
    res.json(todos)
});

// Post endpoint to create a new todo item
app.post("/todos", (req,res) =>{
    const todo = {
        id: todos.length + 1,  // Generate new ID for todo item
        title: req.body.title, // The title of the todo item is taken from the request body (since it is in JSON format)
        completed: req.body.completed || false, // Same concept as above however if the client does not send a status it is made false
    };
    todos.push(todo); // Push the newly created todo object into the todos array (In-memory storage for todos)
    res.status(201).json(todo); // Sets HTTP status code to created (Meaning the the todo object has been successfully created on the server side)
});

app.delete("/todos/:id", (req,res) => {
    const id = parseInt(req.params.id); // extracts id from parameter and converts it into a int
    const index = todos.findIndex((t) => t.id === id); // finds the index of the todos item with the id provided in the request
    if(index === -1) {                                 // If id is not found send status 404 to client
        return res.status(404).json({error: 'Todo not found'});
    }
    todos.splice(index,1);  // Removes the one arguemt at the given index, one is defined by the second parameter in splice
    res.status(204).send(); // sends status 204 (no content) which means delete operation was succesful
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



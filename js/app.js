//Selectors
const todoInput = document.querySelector('input');
const todoButton = document.querySelector('button');
const todoList = document.querySelector('.todo-list');  //ul element
const filterOption = document.querySelector('.filter');  //select element


//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


//functions
function addTodo(event) {
    event.preventDefault(); // Prevent form submission

    // adding a new tododiv
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // creating a new list item
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    saveLocalTodos(todoInput.value);

    // creating a check button
    const checkButton = document.createElement('button');
    checkButton.innerHTML = '<i class="fas fa-check"></i>';
    checkButton.classList.add('complete-btn');
    todoDiv.appendChild(checkButton);

    // creating a delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete-btn');
    todoDiv.appendChild(deleteButton);


    // adding the todo div to the ul
    todoList.appendChild(todoDiv);

    // clear the input value
    todoInput.value = '';
}

function deleteCheck(e) {
    const item = e.target;  // Get the clicked element

    // Delete the todo item
    // if (item.classList[0] === 'delete-btn')  
    if (item.classList.contains('delete-btn')) {
        const todo = item.parentElement;  // Get the parent div of the delete button
        todo.classList.add('fall');
        removeLocalTodos(todo);  // Remove the todo from local storage
        todo.addEventListener("transitionend", function () {
            todo.remove();  // Remove the todo div after the transition ends
        });
    }
    // Check the todo item
    // if (item.classList[0] === 'complete-btn') 
    if (item.classList.contains('complete-btn')) {
        const todo = item.parentElement;  // Get the parent div of the check button
        todo.classList.toggle('completed');  // Toggle the 'completed' class
    }
}

function filterTodo(e) {
    const todos = Array.from(todoList.children);  // Get all the todo items (divs) in the list
    //we used array from to b able to use for each
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";  // Show all todos
                break
            case "finished":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";  // Show completed todos
                } else {
                    todo.style.display = "none";  // Hide uncompleted todos
                }
                break
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";  // Show uncompleted todos
                } else {
                    todo.style.display = "none";  // Hide completed todos
                }
                break
        }
    });
}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function (todo) {
        // Create the todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        // Create the list item
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        // Add the check button (and any other buttons)
        const checkButton = document.createElement("button");
        checkButton.innerHTML = '<i class="fas fa-check"></i>';
        checkButton.classList.add("complete-btn");
        todoDiv.appendChild(checkButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add('delete-btn');
        todoDiv.appendChild(deleteButton);

        // Finally, append to your main list (ul)
        const todoList = document.querySelector(".todo-list"); // Make sure this matches your HTML
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;  // Get the index of the todo item i want to delete
    todos.splice(todos.indexOf(todoIndex), 1);  // Remove the todo from the array
    localStorage.setItem("todos", JSON.stringify(todos));  // Update local storage
}
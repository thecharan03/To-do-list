// Show welcome message from backend when page loads
fetch("http://127.0.0.1:8000/")
    .then(response => response.json())
    .then(data => {
        document.getElementById("main").innerText = data.message;
    });


// Add a new task
function addTask() {
    const taskTitle = document.getElementById("taskinput").value;
    const taskDescription = document.getElementById("taskdescription").value;

    fetch("http://127.0.0.1:8000/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: taskTitle, description: taskDescription })
    })
    .then(response => response.json())
    .then(data => {
        displayTasks(data.tasks);
    });
}


// Show all tasks on the screen, each with its own Update and Delete buttons
function displayTasks(tasks) {
    const list = document.getElementById("tasklist");
    list.innerHTML = "";

    tasks.forEach(task => {
        list.innerHTML += `
            <div>
                <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleComplete(${task.id})">
                <p>${task.id} - ${task.title} - ${task.description} - ${task.completed ? "Done" : "Pending"}</p>
                <button onclick="updateTask(${task.id})">Update</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
    });
}


function toggleComplete(taskId) {
    fetch(`http://127.0.0.1:8000/tasks/${taskId}/toggle`, {
        method: "PUT"
    })
    .then(response => response.json())
    .then(data => {
        displayTasks(data.tasks);
    });
}

// Update one task by id (uses whatever is currently in the input boxes)
function updateTask(taskId) {
    const taskTitle = document.getElementById("taskinput").value;
    const taskDescription = document.getElementById("taskdescription").value;

    fetch(`http://127.0.0.1:8000/tasks/${taskId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: taskTitle, description: taskDescription })
    })
    .then(response => response.json())
    .then(data => {
        displayTasks(data.tasks);
    });
}


// Delete one task by id
function deleteTask(taskId) {
    fetch(`http://127.0.0.1:8000/tasks/${taskId}`, {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
        displayTasks(data.tasks);
    });
}
//Initialize variables
let tasks = [];
let nextTaskId = 1;

const taskForm = document.getElementById('task-form');
const taskManagerDiv = document.getElementById('taskmanager');

//Logs the task list in the console
function logTaskUpdate() {
    console.log("--- Task List Update ---");
    console.log(JSON.stringify(tasks, null, 2));
    console.log("------------------------");
}

function renderTasks() {
    taskManagerDiv.innerHTML = '';

//Shows message when task list is empty
    if (tasks.length === 0) {
        taskManagerDiv.innerHTML = '<p class="no-tasks-msg">No tasks yet.</p>';
        return;
    }

    tasks.forEach(function(task) { 
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.setAttribute('data-id', task.id);

//Sets a task as complete
        if (task.isCompleted) {
            taskItem.classList.add('completed-task');
        }

//Sets a task as important
        if (task.isImportant) {
            taskItem.style.borderLeft = '5px solid red';
            taskItem.classList.add('important-task');
        }

//Creates a task box by creating the html, with the necessary buttons and labels
        taskItem.innerHTML = ` 
            <div class="task-info"> 
                <span class="task-name">${task.name}</span> 
                <span class="task-meta"> 
                    Priority: <span class="priority-${task.priority}">${task.priority}</span> 
                    | Added: ${task.date} 
                </span> 
            </div> 
            <div class="task-actions"> 
                <input type="checkbox" class="complete-checkbox" 
                ${task.isCompleted ? 'checked' : ''} title="Mark as Completed"> 
                <button class="delete-btn" title="Delete Task">Delete</button> 
            </div> 
        `;

        taskManagerDiv.appendChild(taskItem);
    });
}

//Adding a task
function addTask(e) { 
    e.preventDefault(); //Stops the page from refreshing

//Gets the input values 
    const nameInput = document.getElementById('task-name');
    const priorityInput = document.getElementById('task-priority');
    const importantInput = document.getElementById('is-important');

    const taskName = nameInput.value.trim();

//Makes sure input wasn't empty
    if (taskName === "") {
        alert("Task name cannot be empty!");
        return;
    }

//Creates the new task with the values
    const newTask = {
        id: nextTaskId++,
        name: taskName,
        priority: priorityInput.value,
        isImportant: importantInput.checked,
        isCompleted: false,
        date: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    };

//Adds task to array
    tasks.push(newTask);
    
//Resets the form to default values
    nameInput.value = '';
    priorityInput.value = 'Medium';
    importantInput.checked = false;

    renderTasks();
    logTaskUpdate();
}

//Button interactions
function handleTaskActions(e) {
    const target = e.target;
    const taskItem = target.closest('.task-item');
    if (!taskItem) return;

    const taskId = parseInt(taskItem.getAttribute('data-id'));

//Deletes task by creating a new list without it
    if (target.classList.contains('delete-btn')) {
        tasks = tasks.filter(function(task) { 
            return task.id !== taskId;
        });
        renderTasks();
        logTaskUpdate();
    }
//Marks task as complete
    else if (target.classList.contains('complete-checkbox')) {
        const taskIndex = tasks.findIndex(function(task) {
            return task.id === taskId;
        });
        
        if (taskIndex !== -1) {
            tasks[taskIndex].isCompleted = target.checked;
            
            renderTasks();
            logTaskUpdate();
        }
    }
}

//Button interactions
taskForm.addEventListener('submit', addTask);
taskManagerDiv.addEventListener('click', handleTaskActions);

renderTasks();
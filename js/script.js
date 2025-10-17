let tasksDb = [];

function addTask() {
    const taskInput = document.getElementById('todo-input');
    const taskDate = document.getElementById('todo-date');

    if (validateInput(taskInput.value, taskDate.value)) {
        const newTask = {
            task: taskInput.value,
            date: taskDate.value,
            status: 'pending',
            completed: false
        }

        tasksDb.push(newTask);
        renderTasks();

        //clears input
        taskInput.value = '';
        taskDate.value = '';
    }
}

// function to display tasks on the screen
function renderTasks () {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    if (tasksDb.length === 0) {
        taskList.innerHTML = `
            <tr>
                <td colspan="4" class="no-tasks">No task found</td>
            </tr>
        `;
        return;
    }

    ///render each task
    tasksDb.forEach((taskObj, index) => {

        // readable date format
        const formattedDate = formatDate(taskObj.date);
        
        // define the class for the status
        const statusClass = taskObj.status === 'completed' ? 'status-completed' : 'status-pending';
        const statusText = taskObj.status === 'completed' ? 'Completed' : 'Pending';
        
        // class for completed task
        const taskClass = taskObj.completed ? 'task-completed' : '';

        taskList.innerHTML += `
        

        
        <tr>
                <td class="${taskClass}">${taskObj.task}</td>
                <td>${formattedDate}</td>
                <td>
                    <span class="status-badge ${statusClass}">${statusText}</span>
                </td>
                <td>
                    <button class="action-btn btn-complete" onclick="toggleComplete(${index})">
                        ${taskObj.completed ? 'Undo' : 'Complete'}
                    </button>
                    <button class="action-btn btn-delete" onclick="deleteTask(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

// function for calendar
function formatDate(dateString) {
    if (!dateString) return '-';
    
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function toggleComplete(index) {
    // toggle status completed
    tasksDb[index].completed = !tasksDb[index].completed;
    
    // update status text
    if (tasksDb[index].completed) {
        tasksDb[index].status = 'completed';
    } else {
        tasksDb[index].status = 'pending';
    }
    
    renderTasks();
}

// Function to delete individual task
function deleteTask(index) {
    const confirmDelete = confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
        tasksDb.splice(index, 1);
        renderTasks();
    }
}

function deleteAllTasks() {
   if (tasksDb.length === 0) {
        alert('No tasks to delete');
        return;
    }
    
    const confirmDelete = confirm('Are you sure you want to delete all tasks?');
    if (confirmDelete) {
        tasksDb = [];
        renderTasks();
    }
}

function validateInput(task, date) {
    if (task.trim() === '' || date.trim() === '') {
        alert('Please enter both task and due date.');
        return false;
    }
    return true;
}

function filterTasks () { }

// Function to sort tasks by date (ascending - earliest first)
function sortByDate() {
    if (tasksDb.length === 0) {
        alert('No tasks to sort');
        return;
    }
    
    tasksDb.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB; // Sort ascending (earliest first)
    });
    
    renderTasks();
}

window.onload = function() {
    renderTasks();

    document.getElementById('todo-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
};

function validateInput(task, date) {
    if (task.trim() === '' || date.trim() === '') {
        alert('Please enter both task and due date.');
        return false;
    }
    return true;
}
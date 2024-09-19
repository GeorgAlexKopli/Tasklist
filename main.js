const loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
const tasksKey = `tasks-${loggedInUserEmail}`; // Unique key for each user

let tasks = [];
let lastTaskId = 0;
let taskList;
let addTask;

// When the page is loaded
window.addEventListener('load', () => {
    taskList = document.querySelector('#task-list');
    addTask = document.querySelector('#add-task');

    // Clear current tasks from the list
    taskList.innerHTML = '';

    // Load tasks from localStorage
    loadTasks();

    // Render each task on the page
    tasks.forEach(renderTask);

    // When the add task button is clicked
    addTask.addEventListener('click', () => {
        const task = createTask();
        const taskRow = createTaskRow(task);
        taskList.appendChild(taskRow);
        saveTasks(); // Save updated tasks to localStorage
    });
});

function loadTasks() {
    const storedTasks = localStorage.getItem(tasksKey);
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        lastTaskId = tasks.length ? tasks[tasks.length - 1].id : 0;
    } else {
        tasks = [];
        lastTaskId = 0;
    }
}

function saveTasks() {
    localStorage.setItem(tasksKey, JSON.stringify(tasks));
}

function renderTask(task) {
    const taskRow = createTaskRow(task);
    taskList.appendChild(taskRow);
}

function createTask() {
    lastTaskId++;
    const task = {
        id: lastTaskId,
        name: 'New task',
        completed: false
    };
    tasks.push(task);
    return task;
}

function createTaskRow(task) {
    let taskRow = document.querySelector('[data-template="task-row"]').cloneNode(true);
    taskRow.removeAttribute('data-template');

    // Fill form fields with data
    const name = taskRow.querySelector("[name='name']");
    name.value = task.name;

    const checkbox = taskRow.querySelector("[name='completed']");
    checkbox.checked = task.completed;

    // Add event listener to the delete button
    const deleteButton = taskRow.querySelector('.delete-task');
    deleteButton.addEventListener('click', () => {
        taskList.removeChild(taskRow);
        tasks = tasks.filter(t => t.id !== task.id); // Remove task from the array
        saveTasks(); // Save updated tasks to localStorage
    });

    // Add event listener to the checkbox to update task completion
    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        saveTasks(); // Save updated tasks to localStorage
    });

    // Add event listener to the task name input to update task name
    name.addEventListener('input', () => {
        task.name = name.value;
        saveTasks(); // Save updated tasks to localStorage
    });

    // Prepare custom-designed checkboxes for interaction
    hydrateAntCheckboxes(taskRow);

    return taskRow;
}

function createAntCheckbox() {
    const checkbox = document.querySelector('[data-template="ant-checkbox"]').cloneNode(true);
    checkbox.removeAttribute('data-template');
    hydrateAntCheckboxes(checkbox);
    return checkbox;
}

/**
 * This function helps add necessary event listeners to custom-designed checkboxes
 * @param {HTMLElement} element Checkbox wrapper element or container element containing multiple checkboxes
 */
function hydrateAntCheckboxes(element) {
    const elements = element.querySelectorAll('.ant-checkbox-wrapper');
    for (let i = 0; i < elements.length; i++) {
        let wrapper = elements[i];

        // Skip if already processed
        if (wrapper.__hydrated) continue;
        wrapper.__hydrated = true;

        const checkbox = wrapper.querySelector('.ant-checkbox');

        // Check if checkbox should already be checked (custom checkbox design)
        const input = wrapper.querySelector('.ant-checkbox-input');
        if (input.checked) {
            checkbox.classList.add('ant-checkbox-checked');
        }
        
        // Update checkbox design on click
        input.addEventListener('change', () => {
            checkbox.classList.toggle('ant-checkbox-checked');
        });
    }
}

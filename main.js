const taskList = document.getElementById('task-list');

if (!sessionStorage.getItem('access_token')) {
    window.location.href = 'index.html';
} else {
    loadTasks();
}

async function loadTasks() {
    try {
        const tasks = await apiRequest('/tasks');
        tasks.forEach(renderTask);
    } catch (error) {
        alert(error.message);
    }
}

document.getElementById('add-task').addEventListener('click', async () => {
    try {
        const task = await apiRequest('/tasks', {
            method: 'POST',
            body: JSON.stringify({ title: 'New task', desc: '' })
        });
        renderTask(task);
    } catch (error) {
        alert(error.message);
    }
});

function renderTask(task) {
    const row = document.querySelector('[data-template="task-row"]').cloneNode(true);
    row.removeAttribute('data-template');
    const name = row.querySelector('[name="name"]');
    const checkbox = row.querySelector('[name="completed"]');
    name.value = task.title;
    checkbox.checked = task.marked_as_done;

    row.querySelector('.delete-task').addEventListener('click', async () => {
        try {
            await apiRequest(`/tasks/${task.id}`, { method: 'DELETE' });
            row.remove();
        } catch (error) {
            alert(error.message);
        }
    });

    checkbox.addEventListener('change', async () => {
        try {
            await updateTask(task, { marked_as_done: checkbox.checked });
        } catch (error) {
            checkbox.checked = task.marked_as_done;
            updateCheckboxStyle();
            alert(error.message);
        }
    });

    name.addEventListener('change', async () => {
        const title = name.value.trim();
        if (!title) {
            name.value = task.title;
            return;
        }
        try {
            await updateTask(task, { title });
        } catch (error) {
            name.value = task.title;
            alert(error.message);
        }
    });

    function updateCheckboxStyle() {
        row.querySelector('.ant-checkbox').classList.toggle('ant-checkbox-checked', checkbox.checked);
    }
    checkbox.addEventListener('change', updateCheckboxStyle);
    updateCheckboxStyle();
    taskList.appendChild(row);
}

async function updateTask(task, changes) {
    const updated = await apiRequest(`/tasks/${task.id}`, {
        method: 'PUT',
        body: JSON.stringify(changes)
    });
    Object.assign(task, updated, changes);
}

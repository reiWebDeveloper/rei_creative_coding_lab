const formEl = document.getElementById("todo-form");
const inputFieldText = document.getElementById("newTodo");
const list = document.getElementById("todoList");
const message = document.getElementById("warningMsg");

const listArr = [];
const maxItems = 10;



// Add task
function addTask() {

    const taskText = inputFieldText.value.trim();
    if (taskText === "") {
        message.textContent = "You should write something first!";
        return;
    } 

    if (listArr.length >= maxItems) {
        message.textContent = `Cannot add more than ${maxItems} tasks!`;
        inputFieldText.value = "";
        return;
    }

    const task = {
        id: Date.now(),    // unique id
        text: taskText,
        completed: false
    };

    listArr.push(task);
    renderTask(task);

    inputFieldText.value = "";
    saveData();
}

// Render a single task
function renderTask(task) {
    const li = document.createElement("li");
    li.dataset.id = task.id;

    const span = document.createElement("span");
    span.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
}

function saveData() {
  localStorage.setItem("task_data", JSON.stringify(listArr));
}

function showData() {
  const stored = localStorage.getItem("task_data");
  if (!stored) return;

  const savedTasks = JSON.parse(stored);
  savedTasks.forEach(task => {
    listArr.push(task);
    renderTask(task);
  });

  // Re-apply checked styles
  savedTasks.forEach(task => {
    if (task.completed) {
      const li = list.querySelector(`[data-id="${task.id}"]`);
      if (li) li.classList.add("checked");
    }
  });
}

// Form submit
formEl.addEventListener("submit", function(e) {
    e.preventDefault();
    addTask();
});

list.addEventListener("click", function(e) {

    if (!e.target.closest("li")) return; 

    const li = e.target.closest("li");
    const id = Number(li.dataset.id);
    const index = listArr.findIndex(task => task.id === id);

    if (e.target.classList.contains("delete-btn")) {

        // remove from array
        if (index !== -1) {
            listArr.splice(index, 1);
            console.log(listArr);
        }
        
        // remove from DOM
        li.remove();
        saveData();

    } else {

        if (index !== -1) {
            const task = listArr[index];
            task.completed = !task.completed;
            if (task.completed) {
                li.classList.add("checked"); 
                console.log("Checked");
            } else {
                li.classList.remove("checked");
                console.log("unchecked");
            }
        }

    }
});

showData();
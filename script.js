const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const allBtn = document.getElementById("allBtn");
const activeBtn = document.getElementById("activeBtn");
const completedBtn = document.getElementById("completedBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

renderTasks();

addBtn.addEventListener("click", addTask);

allBtn.addEventListener("click", () => {
    currentFilter = "all";
    renderTasks();
});

activeBtn.addEventListener("click", () => {
    currentFilter = "active";
    renderTasks();
});

completedBtn.addEventListener("click", () => {
    currentFilter = "completed";
    renderTasks();
});

function addTask() {

    const task = taskInput.value.trim();

    if(task === ""){
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text: task,
        completed: false
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
}

function renderTasks(){

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if(currentFilter === "active"){
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if(currentFilter === "completed"){
        filteredTasks = tasks.filter(task => task.completed);
    }

    filteredTasks.forEach(task=>{

        const realIndex = tasks.indexOf(task);

        const li = document.createElement("li");

        li.innerHTML = `
        <span class="${task.completed ? 'complete' : ''}">
            ${task.text}
        </span>

        <div>

            <button class="completeBtn" data-index="${realIndex}">
                Complete
            </button>

            <button class="editBtn" data-index="${realIndex}">
                Edit
            </button>

            <button class="deleteBtn" data-index="${realIndex}">
                Delete
            </button>

        </div>
        `;

        taskList.appendChild(li);

    });

}

taskList.addEventListener("click",function(e){

    const index = e.target.dataset.index;

    if(index===undefined) return;

    if(e.target.classList.contains("completeBtn")){

        tasks[index].completed = !tasks[index].completed;

    }

    if(e.target.classList.contains("editBtn")){

        const newTask = prompt("Edit Task",tasks[index].text);

        if(newTask && newTask.trim()!==""){

            tasks[index].text = newTask;

        }

    }

    if(e.target.classList.contains("deleteBtn")){

        tasks.splice(index,1);

    }

    saveTasks();

    renderTasks();

});

function saveTasks(){

    localStorage.setItem("tasks",JSON.stringify(tasks));

}

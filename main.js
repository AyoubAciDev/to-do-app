// first let get every html element needed:
const inputElement = document.querySelector(".input-task");
const addBtnElement = document.querySelector(".add-btn");
const emptyElement = document.querySelector(".no-tasks");
const pleaseElement = document.querySelector(".please");
const tasksContainerElement = document.querySelector(".tasks-container");

// start by creating the array that will hold our tasks:
let tasks = [];

addBtnElement.addEventListener("click", addTask);
// let create a function that adds a task to the array
function addTask() {
  // get the task entered:
  if (inputElement.value) {
    emptyElement.style.display = "none";
    tasks += {
      id: tasks.length + 1,
      title: `${inputElement.value}`
    }

    let taskGeneratedHtml = `        
      <div class="task-container">
          <div class="task task-id-${tasks.length + 1}">
            <div class="checked"></div>
            <p class="task-title">${inputElement.value}</p>
          </div>
          <button class="delete-task">X</button>
      </div>`;
    tasksContainerElement
    console.log(tasks);
  } else {
    pleaseElement.style.display = "block";
  }
}

const taskElement = document.querySelector(".task-id-1");
const deleteBtnElement = document.querySelector(".delete-task");


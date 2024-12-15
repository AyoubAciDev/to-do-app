// first let get every html element needed:
const inputElement = document.querySelector(".input-task");
const addBtnElement = document.querySelector(".add-btn");
const emptyElement = document.querySelector(".no-tasks");
const pleaseElement = document.querySelector(".please");
const tasksContainerElement = document.querySelector(".tasks-container");
// let have a var that holds our strored list:
let storedList = retrieveList() || [];


// start by creating the array that will hold our tasks:
let tasks = storedList.length ? storedList : [] ;
console.log(tasks);
generateHtml(tasks);
// now if the tasks already has tasks :

function generateHtml(tasks) {
  if (tasks.length) {
    tasks.forEach((element, index) => {
      // let create every task html content
      let taskGeneratedHtml = document.createElement("div");
      taskGeneratedHtml.className = `task-container id-${element.id}`;
    
      taskGeneratedHtml.innerHTML =
        `
      <div class="task id-${element.id}" data-task-id = "${element.id}">
        <div class="checked"></div>
        <p class="task-title title-id-${element.id}">${element.title}</p>
      </div>
      <button class="delete-task id-${element.id}">x</button>
      `;
      
      tasksContainerElement.insertAdjacentElement("afterbegin", taskGeneratedHtml);
      
      let taskElement = document.querySelector(`.task.id-${element.id}`);
      taskElement.addEventListener("click", () => {
        taskElement.classList.toggle("done");
        
      })
      // add eventlistner to every delete btn :
      let deleteBtnElement = document.querySelector(`.delete-task.id-${element.id}`);
      deleteBtnElement.addEventListener("click", () => {
        // Find the index of the task based on its id
        const taskIndex = tasks.findIndex(task => task.id === element.id);
        storeList(tasks);
        if (taskIndex !== -1) {
          tasks.splice(taskIndex, 1);  // Remove the task from the array
          storeList(tasks);  // Update the stored list
          taskGeneratedHtml.remove();  // Remove the task from the DOM
          tasks.length ? emptyElement.style.display = "none" : emptyElement.style.display = "block";
        }
      });
      

    }
    );
    
  }
  
  tasks.length ? emptyElement.style.display = "none" : emptyElement.style.display = "block";

}

// add task every time one was created:
addBtnElement.addEventListener("click", () => {
  // add new rask :
  addTask(tasks);
  // check if the task list is empty :
  tasks.length ? emptyElement.style.display = "none" : emptyElement.style.display = "block";

});



// let create a function that adds a task to the array
function addTask(tasks) {
  // get the task entered:
  if (inputElement.value) {
    tasks.push({
      id: tasks.length + 1,
      title: `${inputElement.value}`
    });
    
    storeList(tasks);
    
    
    // let create every task html content
    let taskGeneratedHtml = document.createElement("div");
    taskGeneratedHtml.className = `task-container id-${tasks.length + 1}`;
    
    taskGeneratedHtml.innerHTML =
    `
    <div class="task id-${tasks.length + 1}" data-task-id = "${tasks.length + 1}">
    <div class="checked"></div>
    <p class="task-title title-id-${tasks.length + 1}">${inputElement.value}</p>
    </div>
    <button class="delete-task">x</button>
    `;
    
    tasksContainerElement.insertAdjacentElement("afterbegin", taskGeneratedHtml);
    
    let taskElement = document.querySelector(`.task.id-${tasks.length + 1}`);
    taskElement.addEventListener("click", () => {
      taskElement.classList.toggle("done");
      
    })
    inputElement.value = "";
  }
  
  
}

// create a function that store the tasks list into localStorage
function storeList(tasks) {
  // convert it to list to string if possible !
  if (tasks.length) {
    let tasksStrign = JSON.stringify(tasks);
    localStorage.setItem("tasks", tasksStrign);
  }
}

// create a function that store the tasks list into localStorage
function retrieveList() {
  // convert list back to an object if possible !
  let retrievedList = JSON.parse(localStorage.getItem("tasks"));
  return retrievedList;
}




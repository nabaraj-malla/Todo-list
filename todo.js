var todoApp = (function () {
  let tasks = [];
  const tasksList = document.getElementById("list");
  const addTaskInput = document.getElementById("add");
  const tasksCounter = document.getElementById("tasks-counter");
  // tasksList.innerHTML = "";
  var num = 30;
  // console.log(num);
  console.log("working");

  async function fetchTodos() {
    //using promises
    // get request
    //   fetch("https://jsonplaceholder.typicode.com/todos") // returns promise
    //     .then(function (response) {
    //       // here response is an object
    //       //   console.log(response);
    //       return response.json(); // returns promise again
    //     })
    //     .then(function (data) {
    //       //   console.log(data);
    //       tasks = data.slice(0, 10);
    //       renderList();
    //     })
    //     .catch(function (error) {
    //       console.log("error", error);
    //     });

    // using async await
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();
      tasks = await data.slice(0, 10);
      renderList();
    } catch (error) {
      console.log(error);
    }
  }

  function addTaskToDOM(task) {
    const li = document.createElement("li");
    li.innerHTML = `
   <li>
    <input type="checkbox" id="${task.id}" ${
      task.completed ? "checked" : ""
    } class="custom-checkbox">
    <label for="${task.id}">"${task.title}"</label>
     <img src="768370.png" class="delete" data-id="${task.id}" />
  </li> 
    `;

    tasksList.append(li);
  }

  function renderList() {
    tasksList.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
      addTaskToDOM(tasks[i]);
    }
    tasksCounter.innerHTML = tasks.length;
  }

  function toggleTask(taskId) {
    // Approach first
    //   tasks.forEach(function (task) {
    //     if (task.id === taskId) {
    //       task.done = true;
    //     }
    //   });
    //   renderList(tasks);
    // Approach second
    // filter function returns an array

    const task = tasks.filter(function (task) {
      return task.id === Number(taskId);
    });

    if (task.length > 0) {
      const currentTask = task[0];
      currentTask.completed = !currentTask.completed;
      renderList();
      showNotification("Task toggled successfully");
      return;
    }

    showNotification("Could not toggle the task");
  }

  function deleteTask(taskId) {
    const newTasks = tasks.filter(function (task) {
      return task.id !== Number(taskId);
    });

    tasks = newTasks;
    renderList();
    showNotification("Task deleted succesfully");
  }

  function addTask(task) {
    if (task) {
      tasks.push(task);
      renderList();
      showNotification("Task added successfully");
      return;
    }

    showNotification("Task can not be added");
  }

  function showNotification(text) {
    alert(text);
  }

  function handleInputKeyPress(e) {
    if (e.key === "Enter") {
      const text = e.target.value;
      console.log("text", text);

      if (!text) {
        showNotification("Task text can not be empty");
        return;
      }

      const task = {
        title: text,
        id: Date.now(),
        completed: false,
      };
      e.target.value = ""; // making value empty again
      addTask(task);
    }
  }

  function handleClickListener(e) {
    const target = e.target;
    console.log(target);
    if (target.className === "delete") {
      const taskId = target.dataset.id;
      deleteTask(taskId);
      return;
    } else if (target.className === "custom-checkbox") {
      const taskId = target.id;
      toggleTask(taskId);
      return;
    }
  }

  function initializeApp() {
    fetchTodos();
    addTaskInput.addEventListener("keyup", handleInputKeyPress);
    document.addEventListener("click", handleClickListener);
  }

  //   initializeApp();

  return {
    initialize: initializeApp,
  };
})();

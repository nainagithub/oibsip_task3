var taskInput = document.getElementById("taskInput");
    var addButton = document.getElementById("addButton");
    var taskList = document.getElementById("taskList");
    var dueDateInput = document.getElementById("dueDateInput");
    var prioritySelect = document.getElementById("prioritySelect");
    var tasks = [];

    function addTask() {
      var taskText = taskInput.value.trim();
      var dueDate = dueDateInput.value;
      var priority = prioritySelect.value;

      if (taskText !== "") {
        var task = {
          text: taskText,
          dueDate: dueDate,
          priority: priority,
          completed: false
        };

        tasks.push(task);
        saveTasksToLocalStorage();

        renderTasks();

        taskInput.value = "";
        dueDateInput.value = "";
        prioritySelect.value = "low";
      }
    }

    function deleteTask(index) {
      tasks.splice(index, 1);
      saveTasksToLocalStorage();
      renderTasks();
    }

    function toggleTaskCompletion(index) {
      tasks[index].completed = !tasks[index].completed;
      saveTasksToLocalStorage();
      renderTasks();
    }

    function saveTasksToLocalStorage() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasksFromLocalStorage() {
      var savedTasks = localStorage.getItem("tasks");
      if (savedTasks) {
        tasks = JSON.parse(savedTasks);
      }
    }

    function renderTasks() {
      taskList.innerHTML = "";

      tasks.forEach(function(task, index) {
        var listItem = document.createElement("li");
        var taskTextNode = document.createTextNode(task.text);
        var prioritySpan = document.createElement("span");
        prioritySpan.className = "priority";
        prioritySpan.textContent = task.priority;
        var dueDateSpan = document.createElement("span");
        dueDateSpan.className = "dueDate";
        dueDateSpan.textContent = task.dueDate;
        var deleteButton = document.createElement("span");
        deleteButton.innerHTML = "&#10060;";
        deleteButton.className = "deleteButton";

        var doneCheckbox = document.createElement("input");
        doneCheckbox.type = "checkbox";
        doneCheckbox.className = "doneCheckbox";
        doneCheckbox.checked = task.completed;

        doneCheckbox.addEventListener("change", function() {
          toggleTaskCompletion(index);
        });

        deleteButton.addEventListener("click", function() {
          deleteTask(index);
        });

        if (task.completed) {
          listItem.classList.add("completed");
        }

        listItem.appendChild(doneCheckbox);
        listItem.appendChild(taskTextNode);
        listItem.appendChild(prioritySpan);
        listItem.appendChild(dueDateSpan);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
      });
    }

    addButton.addEventListener("click", addTask);
    taskInput.addEventListener("keydown", function(event) {
      if (event.keyCode === 13) {
        addTask();
      }
    });

    loadTasksFromLocalStorage();
    renderTasks();
  
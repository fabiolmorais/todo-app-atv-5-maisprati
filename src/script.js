const buttonInput = document.getElementById("buttonInput");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

function addTask() {
  const task = input.value.trim();

  if (task) {
    createTask(task);
    input.value = "";
    saveTasks();
  } else {
    alert("Digite algo antes de apertar em Adicionar!");
  }
}

buttonInput.addEventListener("click", addTask);

function createTask(task) {
  // cria li
  const li = document.createElement("li");
  // cria label que vai dentro da li
  const label = document.createElement("label");
  // cria o checkbox que vai dentro da label
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.setAttribute("id", "inputLabel");
  // cria o span que recebe o texto do input
  const spanText = document.createElement("span");
  spanText.textContent = task;
  // cria o botão de editar que vai dentro da li
  const editButton = document.createElement("button");
  editButton.setAttribute("id", "editButton");
  editButton.textContent = "Editar";
  // cria o botão de deletar que vai dentro da li
  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("id", "deleteButton");
  deleteButton.textContent = "Deletar";

  ul.appendChild(li);
  li.appendChild(label);
  label.appendChild(checkBox);
  label.appendChild(spanText);
  li.appendChild(editButton);
  li.appendChild(deleteButton);

  deleteButton.addEventListener("click", () => {
    ul.removeChild(li);
    saveTasks();
  });

  editButton.addEventListener("click", () => {
    input.classList.toggle("disabled:opacity-20");
    const inputEdit = document.createElement("input");
    inputEdit.value = spanText.textContent;

    const saveButton = document.createElement("button");
    saveButton.setAttribute("id", "saveButton");
    saveButton.textContent = "Salvar";

    checkBox.classList.toggle("hidden");
    spanText.classList.toggle("hidden");
    editButton.classList.toggle("hidden");
    deleteButton.classList.toggle("hidden");
    label.appendChild(inputEdit);
    li.appendChild(saveButton);

    saveButton.addEventListener("click", () => {
      const task = inputEdit.value.trim();
      if (task) {
        spanText.textContent = task;
        inputEdit.classList.toggle("hidden");
        saveButton.classList.toggle("hidden");

        checkBox.classList.toggle("hidden");
        spanText.classList.toggle("hidden");
        editButton.classList.toggle("hidden");
        deleteButton.classList.toggle("hidden");

        saveTasks();
      } else {
        alert("Digite algo antes de apertar em Salvar!");
      }
    });
  });

  li.addEventListener("click", () => {
    spanText.classList.remove("line-through");
    if (checkBox.checked) {
      spanText.classList.add("line-through");     
    }
  })
}

function saveTasks() {
  let tasks = [];
  ul.querySelectorAll("span").forEach((item) => {
    tasks.push(item.textContent.trim());
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(createTask);
}

loadTasks();

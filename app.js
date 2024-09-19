const form = document.querySelector(".js--form");
const input = document.querySelector(".js--form__input");
const todosWrapper = document.querySelector(".js--todos-wrapper");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const renderTodos = () => {
  todosWrapper.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    if (todo.completed) {
      li.classList.add("todo-item--checked");
    }

    li.innerHTML = `
      <input type="checkbox" ${todo.completed ? "checked" : ""} />
      <span class="todo-item__description">${todo.text}</span>
      <button class="todo-item__delete">Видалити</button>
    `;

    li.querySelector("input").addEventListener("click", () => {
      todos[index].completed = !todos[index].completed;
      saveTodos();
      renderTodos();
    });

    li.querySelector(".todo-item__delete").addEventListener("click", () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });

    todosWrapper.appendChild(li);
  });
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const newTodo = {
    text: input.value.trim(),
    completed: false,
  };

  if (newTodo.text.length > 0) {
    todos.push(newTodo);
    saveTodos();
    renderTodos();
    input.value = "";
  }
});

renderTodos();

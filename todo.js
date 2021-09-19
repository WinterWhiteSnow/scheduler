const Form = document.querySelector(".dolist-form")
const todoInput = document.querySelector(".dolist-form input")
const todolist = document.querySelector(".dolist")
const todoKey = "todos"
let todos = [];
const doButton = document.querySelector(".dolist li button")

function savedLocal(){
    localStorage.setItem(todoKey,JSON.stringify(todos))
}

function write(wow){
    wow.preventDefault();
    const answer = todoInput.value;
    const OB = {
        text:answer,
        id:Date.now()
    };
    todos.push(OB);
    todoInput.value = "";
    savedLocal();
    creat(OB);
}

function checked (event) {
    const span = event.target.parentElement;
    span.classList.toggle("textThrough");
}

function creat(answer) {
    const li = document.createElement("li");
    li.id = answer.id;
    const span = document.createElement("span");
    const input = document.createElement("input");
    const label = document.createElement("label");
    const button = document.createElement("button");
    span.innerText = answer.text;
    input.type = "checkbox"
    input.id = "check"
    label.htmlFor = "check"
    button.innerText = "X";
    input.addEventListener("click", checked)
    button.addEventListener("click", remove)
    li.appendChild(input);
    li.appendChild(label);
    li.appendChild(span);
    li.appendChild(button);
    todolist.appendChild(li);
}




function remove (event) {
    const li = event.target.parentElement;
    li.remove();
    todos = todos.filter((potato) => potato.id !== parseInt(li.id));
    savedLocal();
    refresh();
}

function secondClick () {
    todolist.querySelector("li button").classList.toggle("hidden")
}


Form.addEventListener("submit",write);

const savedTodos = localStorage.getItem(todoKey);
if (savedTodos) {
    const parseTodos = JSON.parse(savedTodos);
    parseTodos.forEach((item) => creat(item));
    todos = parseTodos;
}


if (todos.length >= 1) {
    todolist.style.width = doinput.style.width;
}

todolist.querySelector("li span").addEventListener("click",secondClick)
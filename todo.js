

const Form = document.querySelector(".dolist-form")
const Name = Form.querySelector("#name")
const Price = Form.querySelector("#price")
const todolist = document.querySelector(".dolist")
const amount = document.querySelector("span .amount")

const todoKey = "todos"
const amountKey = "amount"
let todos = [];
let totalAmount =0;
let aa = []
const doButton = document.querySelector(".dolist li button")

function savedLocal(){
    localStorage.setItem(todoKey,JSON.stringify(todos));
    localStorage.setItem(amountKey,totalAmount)
}

function write(wow){
    wow.preventDefault();
    const productName = Name.value;
    const productPrice = Price.value;
    const OB = {
        text:productName,
        number:productPrice,
        id:Date.now()
    };
    todos.push(OB);
    totalAmount += parseInt(Price.value);
    Name.value = "";
    Price.value = "";
    savedLocal();
    creat(OB);
}

function checked (event) {
    const span = event.target.parentElement;
    span.classList.toggle("textThrough");
}


function remove (event) {
    const li = event.target.parentElement;
    const wow = li.querySelector("span #amount").innerText
    totalAmount-=parseInt(wow.slice(0,-1))
    li.remove();
    amount.innerText = `총 금액 : ${totalAmount}원`;
    todos = todos.filter((potato) => potato.id !== parseInt(li.id));
    savedLocal();
}

function creat(answer) {
    const li = document.createElement("li");
    li.id = answer.id;
    const nameSpan = document.createElement("span");
    const priceDiv = document.createElement("span");
    const input = document.createElement("input");
    const label = document.createElement("label");
    const button = document.createElement("button");
    priceDiv.id = "amount";
    nameSpan.innerText = answer.text;
    priceDiv.innerText = ` ${answer.number}원`;
    input.type = "checkbox";
    input.id = "check";
    label.htmlFor = "check";
    button.innerText = "X";
    input.addEventListener("click", checked)
    button.addEventListener("click", remove)
    li.appendChild(input);
    li.appendChild(label);
    li.appendChild(nameSpan);
    li.appendChild(priceDiv);
    li.appendChild(button);
    todolist.appendChild(li);
    const wow = localStorage.getItem(amountKey)
    if (wow){
      totalAmount = parseInt(wow)
      amount.innerText = `총 금액 : ${totalAmount}원`;
    }
    else{
    amount.innerText = `총 금액 : ${totalAmount}원`;
    }
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




// if (todos.length >= 1) {
//     todolist.style.width = doinput.style.width;
// }

// todolist.querySelector("li span").addEventListener("click",secondClick)
// centerSpan.style.marginLeft = `${(window.innerWidth / 3.5).toString() + "px"}`
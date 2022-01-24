const addItem = document.getElementById('add-item');
const todoList = document.getElementById('todo-list');
const itemTemplate = document.getElementById('todo-item').content.childNodes[1];

var todoItems = [];



function createNewTodoItem(initialChecked, initialText) {
    // Cloning the template
    const newItem = itemTemplate.cloneNode(true);

    // Getting the sub elements
    const checkbox = newItem.querySelector('input[type="checkbox"]');
    const text = newItem.querySelector('input[type="text"]');
    const button = newItem.querySelector('input[type="button"]');

    // Data representation
    const data = {
        checked: initialChecked,
        text: initialText
    }

    // Setting initial state
    checkbox.checked = initialChecked;
    if(initialChecked) text.setAttribute('class', 'crossed-off');
    text.value = initialText;

    // Adding the logic
    checkbox.addEventListener('input', () => {
        if(checkbox.checked) {
            text.setAttribute('class', 'crossed-off');
        } else {
            text.removeAttribute('class');
        }

        data.checked = checkbox.checked;
        saveTodoItems();
    });

    text.addEventListener('input', () => {
        data.text = text.value;
        saveTodoItems();
    });

    button.addEventListener('click', () => {
        newItem.remove();
        todoItems.splice(todoItems.indexOf(data), 1);

        saveTodoItems();
    });

    // Adding the element to the DOM and our internal array
    todoList.insertBefore(newItem, addItem.parentElement);
    todoItems.push(data);
    saveTodoItems();
}
addItem.addEventListener('click', () => createNewTodoItem(false, ''));



function saveTodoItems() {
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
}

function loadTodoItems() {
    const storedItems = JSON.parse(localStorage.getItem('todoItems'));

    if(storedItems === null) {
        return;
    }

    for(let item of storedItems) {
        createNewTodoItem(item.checked, item.text);
    }
}
loadTodoItems();
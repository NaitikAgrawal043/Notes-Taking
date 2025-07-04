let startbtn = document.querySelector('.add');
let input = document.querySelector('#title');
let deadlineInput = document.querySelector('#deadline');
let addbutton = document.querySelector('#addbutton');
let newlistbutton = document.querySelector('.newlistbtn');
let listArea = document.querySelector('.list-Area');

let currentList;

// Start
startbtn.addEventListener('click', () => {
  input.style.display = "block";
  deadlineInput.style.display = "block";
  addbutton.style.display = "block";
  startbtn.style.display = "none";
});

addbutton.addEventListener('click', () => {
  let text = input.value.trim();
  let deadline = deadlineInput.value;

  if (text !== "") {
    if (!currentList) {
      createNewList();
    }

    let li = document.createElement('li');

    // Checkbox for done
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    // Task text span
    let span = document.createElement('span');
    span.innerText = text;

    // Deadline
    let deadlineSpan = document.createElement('span');
    deadlineSpan.style.marginLeft = "10px";
    if (deadline) {
      deadlineSpan.innerText = `[Due: ${deadline}]`;

      let today = new Date().toISOString().split('T')[0];
      if (deadline < today) {
        deadlineSpan.style.color = "red";
      }
    }

    // Edit on double click
    span.addEventListener('dblclick', () => {
      let newText = prompt("Edit task:", span.innerText);
      if (newText !== null && newText.trim() !== "") {
        span.innerText = newText;
      }
    });

    // Strike through on done
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        span.style.textDecoration = "line-through";
      } else {
        span.style.textDecoration = "none";
      }
    });

    // Delete button
    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = "Delete";
    deleteBtn.className = "delete-btn";

    deleteBtn.addEventListener('click', () => {
      li.remove();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deadlineSpan);
    li.appendChild(deleteBtn);

    currentList.appendChild(li);

    input.value = "";
    deadlineInput.value = "";
    newlistbutton.style.display = "block";
  }
});

newlistbutton.addEventListener('click', () => {
  createNewList();
});

function createNewList() {
  currentList = document.createElement('ul');
  currentList.className = "task-list";
  listArea.appendChild(currentList);
}

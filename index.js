let serviceArray = [
  {
    id: '1',
    task: 'Wash car',
    price: 10,
  },
  {
    id: '2',
    task: 'Mow Lawn',
    price: 20,
  },
  {
    id: '3',
    task: 'Grocery shopping',
    price: 30,
  },
];
const taskBtn = document.getElementById('task-button');
const actBtn = document.getElementById('action-btn');
const invoiceFromLocalStorage = JSON.parse(localStorage.getItem('inv'));
const sendInvoice = document.getElementById('send-btn');
const total = document.querySelector('#total-amount');
const list = document.querySelector('.task-list');
const warning = document.getElementById('warning');
const container = document.querySelector('.task-btn');

let clickedArray = [];

// get item from local storage
if (invoiceFromLocalStorage) {
  clickedArray = invoiceFromLocalStorage;
  displayClickedTask(clickedArray);
}

//Display task buttons on load
const displayTask = serviceArray.map((service) => {
  return `<button value="${service.id}" class='action-btn'>${service.task} : $${service.price}</button>`;
});
taskBtn.innerHTML = displayTask;

// render task in display to the ui
container.addEventListener('click', renderClickedValue);

function renderClickedValue(e) {
  for (let i = 0; i < serviceArray.length; i++) {
    if (e.target.value === serviceArray[i].id) {
      const idVal = clickedArray.find((item) => {
        if (item.id === serviceArray[i].id) {
          return true;
        } else {
          return false;
        }
      });

      if (idVal === undefined) {
        clickedArray.push(serviceArray[i]);
        localStorage.setItem('inv', JSON.stringify(clickedArray));
      } else {
        showElement();
        setTimeout(hideElement, 1000);
      }
    }
    displayClickedTask(clickedArray);
  }
}

// display the task clicked to the ui
function displayClickedTask(clickedArray) {
  let displayTask = '';
  let sum = 0;

  for (let i = 0; i < clickedArray.length; i++) {
    displayTask += `<li>
    <span>${clickedArray[i].task} <button value="${clickedArray[i].id}" id="remove">remove</button>
    </span>
    <span id="amount">$${clickedArray[i].price}</span>
  </li>`;

    sum += clickedArray[i].price;
  }

  list.innerHTML = displayTask;
  total.innerHTML = `$${sum}`;
}

// delete item
list.addEventListener('click', removeItem);
function removeItem(e) {
  if (e.target.tagName === 'BUTTON') {
    clickedArray = clickedArray.filter((item) => item.id !== e.target.value);
    localStorage.setItem('inv', JSON.stringify(clickedArray));

    displayClickedTask(clickedArray);
  } else {
    console.log('filleeee');
  }
}

// send invoice to local storage
sendInvoice.addEventListener('click', function () {
  localStorage.clear();
  clickedArray = [];
  sum = 0;
  displayClickedTask(clickedArray);
});

// Item already exists warning

function showElement() {
  warning.innerHTML = `item already added`;
  warning.style.display = 'block';
}

function hideElement() {
  warning.style.display = 'none';
}

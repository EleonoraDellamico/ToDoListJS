console.log('list in js');
// 1 step, select the elements
const clear = document.querySelector('.clear');
const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');

//2 step, classes name
const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle-thin';
const LINE_THROUGH = 'lineThrough';

//Variable
let LIST = [];
let id = 0;

//Get item from localStorage
let data = localStorage.getItem('TODO');
//Check if data is not empty
if (data) {
	LIST = JSON.parse(data);
	id = LIST.length; //set the id to the last one in the list
	loadList(LIST);
} else {
	//if data isn't empty
	LIST = [];
	id = 0;
}
//load the items to the user's interface
function loadList(array) {
	array.forEach(function(item) {
		addToDo(item.name, item.id, item.done, item.trash);
	});
}
//clear the loclaStorage
clear.addEventListener('click', function() {
	localStorage.clear();
	location.reload();
});

// Show today days
const today = new Date();
const options = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' };
dateElement.innerHTML = today.toLocaleDateString('en-GB', options);

//add Function

function addToDo(toDo, id, done, trash) {
	if (trash) {
		return;
	}
	const DONE = done ? CHECK : UNCHECK;
	const LINE = done ? LINE_THROUGH : '';
	const item = `<li class="item">
        <i class="fa ${DONE}" job="complete" id="${id}"></i>
        <p class="text ${LINE}">${toDo}</p>
        <i class= "fa fa-trash-o de" job="delete" id="${id}"></i> </li>`;
	const position = 'beforeend';
	list.insertAdjacentHTML(position, item);
}

//Add an item to do the list using keyCode
document.addEventListener('keyup', function(event) {
	if (event.keyCode == 13) {
		const toDo = input.value;
		//if the input isn't empty
		if (toDo) {
			addToDo(toDo, id, false, false);
			LIST.push({
				name: toDo,
				id: id,
				done: false,
				trash: false
			});
			//Add item to locla storage (This code must be added where the LIST array is updated)
			localStorage.setItem('TODO', JSON.stringify(LIST));
			id++;
		}
		input.value = '';
	}
});
// complete to do
function completeToDo(element) {
	element.classList.toggle(CHECK);
	element.classList.toggle(UNCHECK);
	element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);

	LIST[element.id].done = LIST[element.id].done ? false : true;
}
//Remove from the list
function removeToDo(element) {
	element.parentNode.parentNode.removeChild(element.parentNode);
	LIST[element.id].trash = true;
}
//Target the items created dynamically

list.addEventListener('click', function(event) {
	const element = event.target; //return the clicked element inside the list
	const elementJob = element.attributes.job.value; // complete or deleted
	if (elementJob == 'complete') {
		completeToDo(element);
	} else if (elementJob == 'delete') {
		removeToDo(element);
	}
	//Add item to locla storage (This code must be added where the LIST array is updated)
	localStorage.setItem('TODO', JSON.stringify(LIST));
});

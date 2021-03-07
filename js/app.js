console.log('list in js');
// 1 step, select the elements
const clear = document.querySelector('.clear');
const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');

//2 step, classes name
const CHECK = ' fa-check-circle';
const UNCHECK = ' fa-circle-thin';
const LINE_THROUGH = 'lineThrough';

//Variable
let LIST = [];
let id = 0;

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
			id++;
		}
		input.value = '';
	}
});

// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

var todoList = {
  todos: [],
  add: function(todoText) {
    this.todos.push({
      todoText: todoText,
      complete: false
    });
  },
  change: function(index, todoText) {
    this.todos[index].todoText = todoText;
  },
  delete: function(index) {
    this.todos.splice(index, 1);
  },
  toggleCompleted: function(index) {
    var todo = this.todos[index]; // grab a specific todo to match to index
    todo.complete = !todo.complete;
  },
  toggleAll: function() {
    var completed = 0; // tells me how many completed items are in my todoList.todo
    var total = this.todos.length; // tells me how many todos I have
    var todo = this.todos; // shortcut to getting todoList.todo without typing a lot
    
    todo.forEach(function(index) {
      var completedTodos = index.complete; // gets todoList.todo.completed for if..else
      if ( completedTodos ) {
        completed++;
      }
    });
    
    todo.forEach(function(index) {
      // Case 1: if everything in true, make it false
      if (completed === total) {
        index.complete = false;
      } 
      // Case 2: otherwise, make everything true
      else {
        index.complete = true;
      }
    });
  }
};


// remember to add your view.display() at the end of each key
var handlers = {
  add: function() {
    var addTextInput = document.getElementById('addInputText'); // text input from HTML
    todoList.add(addTextInput.value);
    addTextInput.value = "";
    view.displayTodos();
  },
  change: function() {
    var changePos = document.getElementById('changePos');  // number input from HTML
    var changeText = document.getElementById('changeText');  // text input from HTML
    todoList.change(changePos.valueAsNumber, changeText.value);
    changePos.value = '';
    changeText.value = '';
    view.displayTodos();
  },
  delete: function(index) {
    todoList.delete(index);
    view.displayTodos();
  },
  toggleCompleted: function() {
    var togglePos = document.getElementById('togglePos');  // number input from HTML
    todoList.toggleCompleted(togglePos.valueAsNumber);
    togglePos.value = '';
    view.displayTodos();
  },
  toggleAll: function() {
   todoList.toggleAll();
   view.displayTodos();
  }
};

var view = {
  displayTodos: function() {
    var ul = document.querySelector('ul');  // gets ul from HTML 
    ul.innerHTML = '';
    // for( var i = 0; i < todoList.todos.length; i++ ){
    //   var li = document.createElement('li');  // creates li in HTML
    //   var todo = todoList.todos[i];  // shortcut to not type a lot
    //   var todoText = '';  // display text that changes based on complete or not
    //   if ( todo.complete ) {
    //     todoText = '(x) ' + todo.todoText;
    //   } else {
    //     todoText = '( ) ' + todo.todoText;
    //   }
    //   li.id = i;
    //   li.textContent = todoText;
    //   li.appendChild(this.createDeleteButton());
    //   ul.appendChild(li);
    // }
    
    todoList.todos.forEach(function(value, index) {
      // create li element
      var li = document.createElement('li');
      // create a todoText variable
      var todoText = '';
      // figure out if each todo item is completed or not and create the todoText text
      if (value.complete) {
        todoText = '(x) ' + value.todoText;
      } else {
        todoText = '( ) ' + value.todoText;
      }
      // put todoText into the li
      li.textContent = todoText;
      // set the id of each li
      li.id = index;
      // append the button to the li
      li.appendChild(this.createDeleteButton());
      // append li to ul
      ul.appendChild(li);
    }, this);
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setUpEventListeners: function () {
    var todosUl = document.querySelector('ul');
    todosUl.addEventListener('click', function(event){
      // get the id of the li
      var idOfLi = parseInt(event.target.parentNode.id);
      // get element that was clicked on
      var clickedElement = event.target;
      // check to see the delete button was clicked
      if (clickedElement.className === 'deleteButton'){
        handlers.delete(idOfLi);
      }
    });
  }
};

view.setUpEventListeners();

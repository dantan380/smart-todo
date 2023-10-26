// Client facing scripts here
$(function() {
  //...init page for user

  //generate a random greeting
  generateRandomGreeting();

  // Add event listeners to new todo form.
  loadNewTodoHandlers();

  //load the user's categories here:
  loadUserTodos();
});

const loadNewTodoHandlers = function() {
  const $form = $('#new-todo-form');
  const $textArea = $form.find('textArea');

  $textArea.on('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      $form.trigger('submit');
    }
  });
};

const generateRandomGreeting = function() {
  const arrOfGreetings = ["What would you like to do?",
    "Let Google decide your tasks for you.",
    "Remember the thing you had to do at that place?  Should have noted it down.",
    "Please keep the to dos to under 30k tasks per month. 😅",
    "Now you have no excuses for missed anniversaries. 🎉",
    "Classify your tasks using Google Natural Language API."];
  const randomNumber = Math.floor(Math.random() * arrOfGreetings.length);
  const greeting = arrOfGreetings[randomNumber];
  $greeting = $(document).find('#greeting');
  $greeting.text(greeting);
};

const loadUserTodos = function() {
  console.log("app.js: Loading user's to dos");

  $.ajax({ method: "GET", url: "/api/todos/withCategories", dataType: "json" })
    .then((results) => {
      console.log("All todos: ", results);
      processTodos(results);
    })
    .catch((err) => {
      console.log(err);
    });
};

const processTodos = function(todos) {
  //helpers = global object of helper functions (client-helper.js)
  clientHelper.locateCategoryElements();
  clientHelper.clearAllTodos();

  todos.forEach((element) => {
    //create HTML element of todo

    const $entry = clientHelper.getTodoHtml(element.title, element.id,
      element.category);

    //finally add the entry to the category.
    clientHelper.appendTodoOnCategory(element.category, $entry);

    //append delete function
    clientHelper.attachDeleteFn($entry);
  });

  //after populating the list items, start attaching element handlers for
  //drag and drop
  clientHelper.attachDragAndDrop();
};

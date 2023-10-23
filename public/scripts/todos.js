const MAX_TITLE_LENGTH = 255;

/* eslint-disable no-undef */
$(function() {
  //handle submit events with AJAX
  $("#new-todo-form").on("submit", enterNewToDo);
});

const enterNewToDo = function(event) {
  //stop the submission from our HTML form
  event.preventDefault();

  const newTodoString = $(event.target).find('textarea').val();

  if (newTodoString === '') {
    console.log("😓 The To Do is empty.");
    return;
  }

  if (newTodoString.length > MAX_TITLE_LENGTH) {
    console.log('Todo title too large!');
    return;
  }

  // Send POST method to '/api/todos' URL with data as JSON.
  console.log('Submitting text: ', newTodoString);
  $.ajax({ method: 'POST', url: '/api/todos', data: { text: newTodoString } });
};








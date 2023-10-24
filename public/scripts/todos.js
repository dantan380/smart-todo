const MAX_TITLE_LENGTH = 255;
// 2 Seconds.
const DEFAULT_WAIT_TIME = 2000;

/* eslint-disable no-undef */
$(function() {
  //handle submit events with AJAX
  $("#new-todo-form").on("submit", enterNewToDo);
});

const enterNewToDo = function(event) {
  //stop the submission from our HTML form
  event.preventDefault();

  const $newTodo = $(event.target).find('textarea');
  const newTodoString = $newTodo.val();

  if (newTodoString === '') {
    console.log("😓 The To Do is empty.");
    formError($newTodo, 'Please input a todo!');
    return;
  }

  if (newTodoString.length > MAX_TITLE_LENGTH) {
    console.log('Todo title too large!');
    // Reset title text.
    $newTodo.val('');
    formError($newTodo, 'Your title is too long!');
    return;
  }

  // Send POST method to '/api/todos' URL with data as JSON.
  console.log('Submitting text: ', newTodoString);
  $.ajax({ method: 'POST', url: '/api/todos', data: { text: newTodoString } })
    .then((response) => {
      console.log("new todo: ", response);
      $newTodo.val('');

      //TODO MOVE TO HELPER FUNCTION
      //Search for this rather than direct referencing here
      const $toEatCategory = $(document).find('#category-to-eat');
      const $toReadCategory = $(document).find('#category-to-read');
      const $toBuyCategory = $(document).find('#category-to-buy');
      const $toWatchCategory = $(document).find('#category-to-watch');
      let todo = response.todo.title;

      //truncate beyond 45 characters
      if (response.todo.title.length > 45) {
        todo = `${response.todo.title.slice(0, 45)}...`;
      }

      const $entry = $(`<li>${todo}</li>`);

      //better than hardcoding category id's here, like (if category = 1, then eat).
      //beacuse if we remove and add category #, then the logic will change.
      //this method is a bit better but there is still some logic tied.
      console.log("response.category: ", response.category);
      switch (response.category) {
        case 'To Eat':
          $toEatCategory.append($entry);
          break;
        case 'To Read':
          $toReadCategory.append($entry);
          break;
        case 'To Buy':
          $toBuyCategory.append($entry);
          break;
        case 'To Watch':
          $toWatchCategory.append($entry);
          break;
        default:
          console.log("there is no category for this to do");
          break;
      }
    })
    .catch(err => {
      console.log(err.message);
    });
};

/**
 * Renders error message on $element, then resets back to normal after DEFAULT_WAIT_TIME.
 * @param {JQuery<HTMLElement>} $element Element responsible for rendering error.
 * @param {string} errMessage Error message that will replace $element's placeholder.
 */
const formError = ($element, errMessage) => {
  const oldClass = 'border border-gray-300';
  const originalPlaceholder = $element.attr('placeholder');

  // Make border thicker, change border color to red, and make placeholder text red.
  const errorClasses = 'border-2 border-red-400 placeholder-red-400';

  $element.removeClass(oldClass);
  $element.addClass(errorClasses);
  $element.attr('placeholder', errMessage);

  // Set input field back to normal after delay.
  setTimeout(() => {
    $element.removeClass(errorClasses);
    $element.addClass(oldClass);
    $element.attr('placeholder', originalPlaceholder);
  }, DEFAULT_WAIT_TIME);
};








const TRUNCATE_CHARACTER_LIMIT = 45;

//IIFE
//helpers in global scope.
//safe to declare outside of document.ready because they will never be called before.  (Invoked from js files inside document.ready)
const clientHelper = (function() {
  const _helpers = {};

  let $toEatCategory;
  let $toReadCategory;
  let $toBuyCategory;
  let $toWatchCategory;

  //make sure this is called once before other helper operations
  _helpers.locateCategoryElements = function() {
    $toEatCategory = $(document).find('#category-to-eat');
    $toReadCategory = $(document).find('#category-to-read');
    $toBuyCategory = $(document).find('#category-to-buy');
    $toWatchCategory = $(document).find('#category-to-watch');
  };

  // Clear all child elements
  _helpers.clearAllTodos = function() {

    $toEatCategory.empty();
    $toReadCategory.empty();
    $toBuyCategory.empty();
    $toWatchCategory.empty();
  };

  //truncates characters if it's too long
  //create html element
  _helpers.getTodoHtml = function(valueOfTodo) {
    let todo = valueOfTodo;
    if (valueOfTodo.length > TRUNCATE_CHARACTER_LIMIT) {
      todo = `${valueOfTodo.slice(0, TRUNCATE_CHARACTER_LIMIT)}...`;
    }

    //our fancy html element
    const $entry = $(`<li>${todo}</li>`);
    return $entry;
  };

  //not a fan of hard coding categories here.
  //TODO in theory we can just create a new column if a category doesn't exist
  _helpers.appendTodoOnCategory = function(category, $entry) {
    switch (category) {
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
  };

  return _helpers;
})();
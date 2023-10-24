
//IIFE
//helpers in global scope.
//safe to declare outside of document.ready because they will never be called before.  (Invoked from js files inside document.ready)
const helpers = (function() {
  const _helpers = {};

  const $toEatCategory = $(document).find('#category-to-eat');
  const $toReadCategory = $(document).find('#category-to-read');
  const $toBuyCategory = $(document).find('#category-to-buy');
  const $toWatchCategory = $(document).find('#category-to-watch');

  _helpers.clearAllTodos = function() {

    // Clear all child elements
    $toEatCategory.empty();
    $toReadCategory.empty();
    $toBuyCategory.empty();
    $toWatchCategory.empty();
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
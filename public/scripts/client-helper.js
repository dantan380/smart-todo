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
    const $entry = $(`<li class="p-2 flex items-center draggable no-select" draggable="true">
    <input type="checkbox" class="mr-2" />
    <label for="item1" class="mr-2">${todo}</label>
    <button
      class="bg-orange-500 hover:bg-blue-600 text-white py-1 px-2 rounded-full"
    >
      Edit
    </button>
  </li>`);
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

  _helpers.attachDragAndDrop = function() {
    const $draggables = $(document).find('.draggable');
    const $containers = $(document).find('article');

    $draggables.each(function() {
      // Wrap the current draggable element in a jQuery object
      const $draggable = $(this);

      $draggable.on('dragstart', () => {
        $draggable.addClass('dragging');
      });

      $draggable.on('dragend', () => {
        $draggable.removeClass('dragging');
      });
    });

    console.log('assigning drag and drop');

    //containers (an <article>)
    $containers.each(function() {

      // Wrap the current draggable element in a jQuery object
      const $container = $(this);
      $container.on('dragover', e => {

        //dropping inside of an element is disabled, by default
        e.preventDefault();

        const $draggable = $(document).find('.dragging');

        $container.append($draggable);
      });
    });
  };
  return _helpers;
})();
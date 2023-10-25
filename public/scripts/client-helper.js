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

  _helpers.getTodoHtml = function(valueOfTodo, todoId, category) {

    let todo = valueOfTodo;
    let id = todoId;
    if (valueOfTodo.length > TRUNCATE_CHARACTER_LIMIT) {
      todo = `${valueOfTodo.slice(0, TRUNCATE_CHARACTER_LIMIT)}...`;
    }

    //our fancy html element
    const $entry = $(`<li class="p-2 flex items-center todoItem draggable no-select justify-between" draggable="true" data="${id}" category="${category}">
    <div class="checkmark-circle shrink-0 w-6 h-6 mr-2 rounded-full border-2 border-black place-content-center cursor-pointer opacity-50 transition-all">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 fill-white">
        <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
      </svg>
    </div>
    <label for="item1" class="mr-2 grow">${todo}</label>
    <button
      class="grow-0 bg-teal-500 text-white py-1 px-3 rounded-full">
      ↔
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

      _helpers.attachDragHelper($draggable);
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

        $container.find('.category-list').append($draggable);
      });
    });
  };

  //attach / remove class on drag start / end
  _helpers.attachDragHelper = function($draggable) {
    $draggable.on('dragstart', () => {
      $draggable.addClass('dragging');
    });

    $draggable.on('dragend', () => {
      $draggable.removeClass('dragging');
      handleCategoryChange($draggable);
    });
  };
  return _helpers;
})();

//makes ajax call to update the backend, and then update the attribute of the todo afterwards.
const handleCategoryChange = function($draggable) {

  //get the parent container
  $parentContainer = $draggable.closest('ul');

  // Get the value of an attribute, for example, "data-custom"
  const nameOfParentCategory = $parentContainer.attr('name');
  const nameOfToDoCategory = $draggable.attr('category');
  const todoId = $draggable.attr('data');

  //there is a change!  We need to make a call to update the backend
  if (nameOfParentCategory !== nameOfToDoCategory) {
    console.log("change required");
    $.ajax({ method: "POST", url: "/api/todos/update", dataType: "json", data: { id: todoId, category: nameOfParentCategory } })
      .then(() => {

        //update the todo with the new parent category
        $draggable.attr('category', nameOfParentCategory);
      });
  }
};
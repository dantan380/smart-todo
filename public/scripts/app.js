// Client facing scripts here
$(function() {
  //...init page for user

  //load the user's categories here:
  loadUserTodos();
});

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

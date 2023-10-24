// Client facing scripts here
$(function() {

  //...init page for user

  //load the user's categories here:
  loadUserTodos();
});

const loadUserTodos = function() {
  console.log("app.js: Loading user's to dos");


  $.ajax({ method: 'GET', url: '/api/todos/withCategories', dataType: 'json' })
    .then((results) => {
      console.log('All todos: ', results);
      processTodos(results);
    })
    .catch(err => {
      console.log(err);
    });

};

const processTodos = function(todos) {

  //helpers = global object of helper functions (client-helper.js)
  helpers.clearAllTodos();

  todos.forEach(element => {

    let todo = element.title;

    //truncate beyond 45 characters
    if (element.title.length > 45) {
      todo = `${element.title.slice(0, 45)}...`;
    }

    //the fancy HTML todo.
    const $entry = $(`<li>${todo}</li>`);

    //finally add the entry to the category.
    helpers.appendTodoOnCategory(element.name, $entry);

  });

};

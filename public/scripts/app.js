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

//array of objects [{name: ...},{...}]
// date_created
// :
// "2023-10-23T07:21:07.057Z";
// description
// :
// "To Watch the Matrix";
// id
// :
// 1;
// is_complete
// :
// false;
// name
// :
// "To Watch";
// title
// :
// "Watch The Matrix";
const processTodos = function(todos) {

  //Search for this rather than direct referencing here
  const $toEatCategory = $(document).find('#category-to-eat');
  const $toReadCategory = $(document).find('#category-to-read');
  const $toBuyCategory = $(document).find('#category-to-buy');
  const $toWatchCategory = $(document).find('#category-to-watch');

  // Clear all child elements
  $toEatCategory.empty();
  $toReadCategory.empty();
  $toBuyCategory.empty();
  $toWatchCategory.empty();

  todos.forEach(element => {

    let todo = element.title;

    //truncate beyond 45 characters
    if (element.title.length > 45) {
      todo = `${element.title.slice(0, 45)}...`;
    }

    const $entry = $(`<li>${todo}</li>`);

    //better than hardcoding category id's here, like (if category = 1, then eat).
    //beacuse if we remove and add category #, then the logic will change.
    //this method is a bit better but there is still some logic tied.
    switch (element.name) {
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
  });

};

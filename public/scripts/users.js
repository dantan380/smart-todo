{
  $(document).ready(function() {

    //handle submit events with AJAX
    $(".tweet-form").on("submit", enterNewToDo);

  });

  const enterNewToDo = function(event) {

    //stop the submission from our HTML form
    event.preventDefault();

    console.log("user entered new to do in text box");

    const formData = $(event.target).serialize();

    // Check if specific input fields are empty by...
    //...filter out the "text=" (key)
    //...check if the (value) is empty
    const value = formData.slice(5);
    if (value === "") {

      console.log("😓 The To Do is empty.");
      return;
    }

    //attempt to make a post call
    //TODO
  };


  // Client facing scripts here
  $(() => {
    $('#fetch-users').on('click', () => {
      $.ajax({
        method: 'GET',
        url: '/api/users'
      })
        .done((response) => {
          const $usersList = $('#users');
          $usersList.empty();

          for (const user of response.users) {
            $(`<li class="user">`).text(user.name).appendTo($usersList);
          }
        });
    });
  });
}








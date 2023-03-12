$(document).ready(onReady);

function onReady() {
  console.log("inside onReady function");
  //event listeners
  $("#submitButton").on("click", submitTasks);
  setupClickListeners();
  //$('#tasksOut').on('click', '.submitButton', putTasks);
  getTasks();
}
function setupClickListeners() {
  //$("#addButton").on("click", saveTasks);

  //created a listener for a button not already in the html file
  //that will run a function that on 'click', will make the specific koala
  //ready to transfer.
  $("#tasksOut").on("click", ".complete", completeTasks);
  $("#tasksOut").on("click", ".deleteBtn", deleteTasks);
}

//created the getKoalas function to GET koalas from the koala router
//and get data from the Koala database.  then, render the information into the DOM under the
//viewKoala part of the the body.
function getTasks() {
  console.log("in getTasks");
  // ajax call to server to get koalas
  $("#tasksOut").empty();
  $.ajax({
    type: "GET",
    url: "/tasks",
  }).then(function (response) {
    console.log("GET /tasks response", response);
    // append data to the DOM

    for (let i = 0; i < response.length; i++) {
      if (response[i].complete == "False") {
        $("#tasksOut").append(`
                    <tr data-id=${response[i].id}>
                      <td>${response[i].task}</td>
                      <td>${response[i].complete}</td>
                      <td>Complete</td>
                      <td><button class=deleteBtn>Delete</button></td>
                    </tr>
                `);
      } else {
        $("#tasksOut").append(`
                    <tr data-id=${response[i].id}>
                        <td>${response[i].task}</td>
                        <td>${response[i].complete}</td>
                        <td><button class=complete>Complete</button></td>
                      <td><button class=deleteBtn>Delete</button></td>
                    </tr>
                `);
      }
    }
  });
}

function completeTasks() {
  console.log("in completeTasks function", $(this));
  // PUT request client-side
  const tasksId = $(this).parent().parent().data().id;
  console.log(tasksId);
  $.ajax({
    method: "PUT",
    url: `/tasks/${tasksId}`,
  })
    .then((response) => {
      console.log("Completed ready for delete by id:", tasksId);
      getTasks();
    })
    .catch(() => {
      console.log("Error changing to complete:", tasksId, error);
    });
}

function submitTasks() {
  console.log("in submitTasks");
  let payloadObject = {
    task: $("#task").val(),
    complete: $("#complete").val(),
  };
  $.ajax({
    type: "POST",
    url: "/tasks",
    data: payloadObject,
  }).then(function (response) {
    $("input").val("");
    getTasks();
  });

  // ajax call to server to POST tasks
}

function deleteTasks() {
  console.log(`Clicked on this ${$(this)} task to delete`);
  const id = $(this).parent().parent().data().id;

  $.ajax({
    method: "DELETE",
    url: `tasks/${id}`,
  })
    .then((result) => {
      console.log("deleted tasks with id: ", id);
      getTasks();
    })
    .catch((error) => {
      console.log("There was an error deleting tasks from server:", error);
    });
}
// DELETING tasks from the server

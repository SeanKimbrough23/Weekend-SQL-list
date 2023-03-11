$(document).ready(onReady);

function onReady() {
  console.log("inside onReady function");
  //event listeners
  $("#submitButton").on("click", submitTasks);
  //$('#tasksOut').on('click', '.submitButton', putTasks);
  getTasks();
}

function submitTasks() {
  let objectToSend = {
    day: $("#date").val(),
    task: $("#task").val(),
    complete: $("#complete").val(),
  };
  console.log("Inside submitTasks:", objectToSend);
  $.ajax({
    type: "POST",
    url: "/tasks",
    data: objectToSend,
  })
    .then(function (response) {
      console.log("response back from POST:", response);
      $("input").val("");
      getTasks();
    })
    .catch(function (error) {
      alert("error adding tasks:", error);
    });
}
//  function getTasks() {
//     $("#tasksOut").empty();
//     $.ajax({
//         type: 'GET',
//         url: '/tasks'
//     }).then(function (response) {
//         console.log("GET /tasks response", response);
//         // append data to the DOM
//         for (let i = 0; i < tasks.length; i++) {
//             $('#tasksOut').append(`
//                 <tr data-id=${tasks[i].id}>
//                     <td>${tasks[i].date}</td>
//                     <td>${tasks[i].task}</td>
//                     <td>${tasks[i].complete}</td>
//                     <td><button class="deletebtn"> delete</button> </td>
//                     <td><button class="updateRankBtn"> Update Rank </button> </td>

//                 </tr>
//             `);
//         }
//     }
//  }

function getTasks() {
  $.ajax({
    type: "GET",
    url: "/tasks",
  })
    .then(function (response) {
      console.log(response);
      render(response);
    })
    .catch(function (error) {
      alert("error getting Tasks:", error);
    });
}

function render(tasks) {
  console.log(tasks);
  let el = $("#tasksOut");
  el.empty();
  for (let i = 0; i < tasks.length; i++) {
    $("#tasksOut").append(`
        <tr data-id=${tasks[i].id}>
            <td>${tasks[i].task}</td>
            <td>${tasks[i].complete}</td>
            <td><button class="deletebtn"> delete</button> </td>
            <td><button class="completeBtn">complete</button> </td>

        </tr>
    `);
  }
}

function deleteTasks() {
  const id = $(this).data("id");
  const deleteThis = $(this).data("complete");
  console.log("inside deleteTasks:", id, deleteThis);
  $.ajax({
    type: "PUT",
    url: `/tasks/${id}`,
    data: { newTasks: deleteThis },
  })
    .then(function (response) {
      console.log("response back from PUT request:", response);
      getTasks();
    })
    .catch(function (error) {
      alert("error updating:", error);
    });
}

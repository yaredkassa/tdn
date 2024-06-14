// // util functions
// const saveTasks = (data) => {
//   const stringifyData = JSON.stringify(data);
//   // fs.writeFileSync("source/public/model/todo.json", stringifyData);

// };

// // Get the button that opens the modal
// let button_x = document.getElementById("toggle_theme");

// if (button_x) {
//   // When the user clicks the button, open the modal
//   button_x.onclick = () => {
//     console.log("Good Job Yared!");
//   };
// }

// fetch("model/todo.json").then((results) => results.json().then(console.log));

// var ele = document.getElementById("taskForm");
// if(ele.addEventListener){
//     ele.addEventListener("submit", callback, false);  //Modern browsers
// }else if(ele.attachEvent){
//     ele.attachEvent('onsubmit', callback);//Old IE
// }

// document.querySelector("#taskForm").addEventListener("submit", function (e) {
//   if (!isValid) {
//     e.preventDefault(); //stop form from submitting
//     console.log('THe form is submitted');
//   }
// });

// // async function loadNames() {
// //   const response = await fetch("model/todo.json");
// //   const json = await response.json();

// //   console.log("Here are the tskes", JSON.stringify(json));
// // }

// // loadNames();

// // Get the button that opens the modal
// // let button_create = document.getElementById("create");

// // let taskForm = document.getElementById("taskForm");

// // if (taskForm) {
// // taskForm.addEventListener("submit", (e) => {
// //   e.preventDefault();

// //   let title = document.getElementById("title");
// //   let important = document.getElementById("important");
// //   let input_due_date = document.getElementById("duedate");
// //   let input_completed = document.getElementById("completed");
// //   let input_description = document.getElementById("description");

// //   saveTasks({
// //     title: title,
// //     day: important,
// //     open: input_due_date,
// //     task: input_completed,
// //     description: input_description,
// //   });
// // });
// // }

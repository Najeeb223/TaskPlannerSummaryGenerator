

const taskList = [ 
   { description: "Make Fajr Salaah", status: "done", priority: "high"},

   { description: "Fetch banana and water meal", status: "done", priority: "medium"},

   { description: "Read Quran", status: "done", priority: "high"},

   { description: "Clean room", status: "pending", priority: "medium"},

   { description: "Attain more LinkedIn connections", status: "pending", priority: "low"},

   { description: "Rebook CPUT graduation ceremony ticket", status: "pending", priority: "high"},

   { description: "Schedule booking with dentist", status: "pending", priority: "medium"},

   { description: "Help sister learn basic web development", status: "pending", priority: "medium"},

   { description: "Do laundry", status: "pending", priority: "high"},

   { description: "Setup meetup with Abdul", status: "pending", priority: "low"}
 ];


const pendingTasks = () => {

   // return console.log((taskList.filter(task => task.status === "pending"))); 

}
pendingTasks();

const taskMessage = () => {
   const timePhrases = [
     "in the morning",
     "after Salah",
     "after dhikr",
     "in the afternoon",
     "throughout the day to build network",
     "when you have enough money",
     "when she is ready to learn it",
     "next week",
     "when he is available"
   ];
 
   taskList.forEach(task => {
     timePhrases.forEach(phrase => {
     //  console.log(`${task.description} ${phrase} | Status ${task.status} | Priority is ${task.priority}`);
     });
   });
 };
taskMessage();

const aggregateTasks = () => {

   for(let i = 0; i < taskList.length; i++) {
   //   console.log(i);
   }

   
// The reduce() method executes a reducer function on each element of the array,
// resulting in a single output value.

// Syntax:
// array.reduce((accumulator, currentValue, currentIndex, array) => {
//    // logic to update accumulator based on currentValue
//    return updatedAccumulator;
// }, initialAccumulatorValue);

// Explanation of parameters:
// - accumulator: Holds the accumulated result of all previous iterations. It starts as the initial value you provide.
// - currentValue: The current element of the array being processed.
// - currentIndex (optional): The index of the current element.
// - array (optional): The array reduce was called upon.

// The reduce function processes the array from left to right, calling the callback for each element.
// Each time, it updates the accumulator based on logic you define and returns it,
// so the accumulator carries updated data to the next iteration.

// At the end, reduce returns the final value of the accumulator.

const taskDonePending = taskList.reduce((acc, task) => {
   // Check the status of the current task
   if (task.status === "done") {
     // Increment the count of done tasks in the accumulator
     acc.doneTasks++;
   } else if (task.status === "pending") {
     // Increment the count of pending tasks in the accumulator
     acc.pendingTasks++;
   }
 
   // Return the updated accumulator so it will be passed to the next iteration
   return acc;
 }, 
 // Initial value of the accumulator: an object with zero counts
 { doneTasks: 0, pendingTasks: 0 });
 
 // After the reduce finishes, taskDonePending will hold an object like:
 // { doneTasks: 5, pendingTasks: 3 }
 // console.log(taskDonePending);
 

   const highPriorityPending = taskList.reduce((acc, task) => {

      if(task.priority === "high" && task.status === "pending") {
         acc.highPriorityPendingTasks++;

      } 
      return acc;
   }, 
      {highPriorityPendingTasks: 0});
      // console.log(highPriorityPending);

}
aggregateTasks();

const highestPriorityPending = () => {


   const highPriorityCheck = taskList.filter(task => {

      if(task.status === "pending" && task.priority === "high") {
       return true;
      }
   }).reduce((acc, task) => {
      if(task.priority === "high" && task.status === "pending") {
         acc.highPriorityAndPending++;
      }

      return acc;

   },

        {highPriorityAndPending: 0});
       // console.log(highPriorityCheck);

}
highestPriorityPending();

const highPriorityTaskCheck = () => {
   // Step 1: Filter out only the tasks that have high priority
   const highPriorityTasks = taskList.filter(task => task.priority === "high");
 
   // Step 2: Check if every high-priority task has the status "done"
   const allHighPriorityDone = highPriorityTasks.every(task => task.status === "done");
 
   // Step 3: Conditional output based on the result of the 'every' check
   if (allHighPriorityDone) {
     // If ALL high-priority tasks are done, print a success message
     console.log("✅ Every high-priority task has been completed.");
   } else {
     // If at least ONE high-priority task is not done, print a warning message
     console.log("❌ Not every high-priority task has been completed. Go do them!");
   }
 };
 
 // Step 4: Call the function to run the check
 highPriorityTaskCheck();
 
 
highPriorityTaskCheck();
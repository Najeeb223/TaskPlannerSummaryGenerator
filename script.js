

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

    return console.log(((taskList.map.forEach(task => `
        
        ${task.description} in the morning | Status ${task.status} | Priority is ${task.priority}
        ${task.description} after Salah | Status ${task.status} | Priority is ${task.priority}
        ${task.description} after dhikr | Status ${task.status} | Priority is ${task.priority}
        ${task.description} in the afternoon | Status ${task.status} | Priority is ${task.priority}
        ${task.description} throughout the day to build network | Status ${task.status} | Priority is ${task.priority}
        ${task.description} when you have enough money | Status ${task.status} | Priority is ${task.priority}
        ${task.description} when she is ready to learn it | Status ${task.status} | Priority is ${task.priority}
        ${task.description} next week | Status ${task.status} | Priority is ${task.priority}
        ${task.description} when he is available | Status ${task.status} | Priority is ${task.priority}
        ` ))));

}
taskMessage();


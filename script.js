

const taskOne = {
    description: "Make Fajr Salaah",

    status: "done",

    priority: "high"

};

const taskTwo = {
    description: "Fetch banana and water meal",

    status: "done",

    priority: "medium"

};

const taskThree = {
    description: "Read Quran",

    status: "done",

    priority: "high"

};

const taskFour = {
    description: "Clean room",

    status: "pending",

    priority: "medium"

};

const taskFive = {
    description: "Attain more LinkedIn connections",

    status: "pending",

    priority: "low"

};

const taskSix = {
    description: "Rebook CPUT graduation ceremony ticket",

    status: "pending",

    priority: "high"

};

const taskSeven = {
    description: "Schedule booking with dentist",

    status: "pending",

    priority: "medium"

};

const taskEight = {
    description: "Help sister learn basic web development",

    status: "pending",

    priority: "medium"

};

const taskNine = {
    description: "Do laundry",

    status: "pending",

    priority: "high"

};

const taskTen = {
    description: "Setup meetup with Abdul",

    status: "pending",

    priority: "low"

};

const taskList = [taskOne, taskTwo, taskThree, taskFour, taskFive, taskSix, taskSeven, taskEight, taskNine, taskTen];



const pendingTasks = () => {

    if(taskList.find(pending)) {
        console.log("heeheee");
    
    } else {
        return null;
    }
}

pendingTasks();

const taskMessage = () => {

}
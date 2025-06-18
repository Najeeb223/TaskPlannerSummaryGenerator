const tasks = [ 

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

const getTasks = () => {

    setTimeout(() => {

        let output = "";
        tasks.forEach((tasks, index) => {
            output += `<li>${tasks.description}</li>`;
        });
        document.body.innerHTML = output;
    }, 1000);

}


/* const createTask = (task, callback) => {

    setTimeout(() => {
        tasks.push(task);
        callback();
    }, 1000);
}

    createTask({description: "Finish async revision", status: "pending", priority: "high"}, getTasks); 
*/

const createTask = (task) => {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            tasks.push(task);

            const error = false;

            if(!error) {
                resolve();
            } else {
                reject("Something went wrong");
            }
        }, 1000);
    });
}

createTask({description: "Finish async revision", status: "pending", priority: "high"})
.then(getTasks)
.catch(err => console.log(err));

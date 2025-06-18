const tasks = [ 

    { description: "Make Fajr Salaah", status: "done", priority: "high"},
 
    { description: "Fetch banana and water meal", status: "done", priority: "medium"},
 
    { description: "Read Quran", status: "done", priority: "high"},
 
    { description: "Clean room", status: "pending", priority: "medium"},
 
    { description: "Attain more LinkedIn connections", status: "pending", priority: "low"}
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
getTasks();


const posts = [

    {title: "Post One", body: "This is post one"},
    { title: "Post Two", body: "This is post two" }  
];

const getPosts = () => {

    // Takes in a callback function and a certain amount of time that delays whatever you put in the callback function
    setTimeout(() => {

    let output = "";
    posts.forEach((posts, index) => {
        output += `<li>${posts.title}</li>`;
    });
    document.body.innerHTML = output;
    }, 1000);

}

const createPost = (post) => {

    // Promise parameters - when you want to resolve a promise successfully you call resolve and when something goes wrong and there
    // is some kind of reject of error you call reject
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push(post);

            const error = false;

            if(!error) {
              resolve();
            } else {
                reject("Error: Something went wrong");
            }
       
       
        }, 2000);

    });
}


    /*
    createPost({title: "Post Three", body: "This is post three"})   
    .then(getPosts)
    .catch(err => console.log(err));
    */

    // Async await is a way to handle responses not a different way to write them
    // A more elegant way to handle promises
/*    
    const init = async () => {
       await createPost({title: "Post Three", body: "This is post three"});
       
       getPosts();
    }
    init();
 */


    // Async await with fetch

    const fetchUsers = async () => {

        const res = await fetch("https://jsonplaceholder.typicode.com/users");

        const data = await res.json();

        console.log(data);
    }
    fetchUsers();
    



    /*
    const promise1 = Promise.resolve("Hello World");
    const promise2 = 10;
    const promise3 = new Promise((resolve, reject) => 
        
        setTimeout(resolve, 2000, "Goodbye"));

        // NB: FETCH is a bit weird, it requires two .then methods because you firstly have to format the data
        // into JSON and then retrieve it
        const promise4 = fetch("https://jsonplaceholder.typicode.com/users").then(res =>
             res.json()
             );

        Promise.all([promise1, promise2, promise3, promise4]).then(
            (values) => console.log(values)
            );
    */

            
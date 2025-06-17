const posts = [

    {title: "Post One", body: "This is post one",
     title: "Post Two", body: "This is post two"   
    }
];

const getPosts = () => {

    // Takes in a callback function and a certain amount of time that delays whatever you put in the callback function
    setTimeout(() => {

    let output = "";
    posts.ForEach((posts, index) => {
        output += `<li>${posts.title}</li>`
    });
    document.body.innerHTML = output;
    }, 1000);

}
getPosts();

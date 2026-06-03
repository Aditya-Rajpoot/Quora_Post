// Import the Express framework to create the web server
const express = require("express");

// Initialize the Express application
const app = express();

// Define the port number the server will listen on
const port = 8080;

// Import Node.js built-in path module for handling file/directory paths
const path = require("path");

// Import uuid library and destructure v4 for generating unique IDs
const { v4: uuidv4 } = require("uuid");

// Import method-override to support PUT and DELETE from HTML forms
// (HTML forms only support GET and POST natively)
const methodOverride = require("method-override");



app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname, "public")));

let posts= [
    {
    id : uuidv4(),
    username : "apna college",
    content : "I love Code"
    },
    {
        id : uuidv4(),
    username : "code with harry",
    content : "I love Code to do for studying"
    },
    {
        id : uuidv4(),
    username : "Aditya",
    content : "I love Code .....and solve the real problem"
    },
    {
        id : uuidv4(),
    username : "Shinchan",
    content : "I love Masti..."
    },
];

app.get("/posts", (req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
res.render("new.ejs");
});

app.get("/posts/:id", (req,res)=>{
    let{id} = req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs",{post});
});

app.post("/posts",(req,res)=>{
    let{username,content}= req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});

app.patch("/posts/:id",(req,res)=>{
    let{id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts")
});

app.get("/posts/:id/edit", (req, res)=>{
    let{id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});
});

app.delete("/posts/:id", (req,res)=>{
    let{id} = req.params;
     posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts")
});


app.listen(port,()=>{
    console.log("Listen on port : 8080");
})

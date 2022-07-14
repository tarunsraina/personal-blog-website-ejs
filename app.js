//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");


let posts = []

const rand1 = "Hello everyone , great to meet you all";
const rand2 = "Lets get this done";
const rand3 = "Thank you all";


const app = express();

app.set('view engine', 'ejs');



app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.render("partials/home",{rand1 : rand1,
  rand2 : rand2 ,
rand3 : rand3,
posts : posts
})
})

app.get("/about",function(req,res){
  res.render("partials/about",{rand1 : rand1})
})

app.get("/contact",function(req,res){
  res.render("partials/contact",{
  rand2 : rand2})
})

app.get("/compose",function(req,res){
  res.render("partials/compose" , posts)
})

app.get("/posts/:post",function(req,res){
  const reqTitle= req.params.post;
 
  posts.forEach(function(post){

    const storedTitle=post.title
    
    
    if(storedTitle.toLowerCase()===reqTitle.toLowerCase()){
      res.render("partials/post" , {
        title : post.title,
        content : post.body
      })
    }
  })
})


app.post("/compose",function(req,res){

  const post = {
    title : req.body.newTitle ,
    body : req.body.newContent
  }

  posts.push(post)

  res.redirect("/")
})



app.listen(3000, function() {
  console.log("Server started on port 3000");
});

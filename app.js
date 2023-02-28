const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const _ = require("lodash");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

var post = [];
var postTopic = "";

const homeStartingContent = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus deserunt tenetur quibusdam natus ut aspernatur laudantium quos alias optio, doloremque est illo. Consequuntur ex neque quo necessitatibus distinctio libero vitae id quasi, ad asperiores nostrum illum obcaecati aspernatur atque nisi sint quidem inventore eveniet eos voluptatem? Aspernatur sequi odit neque.";
const aboutContent = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus deserunt tenetur quibusdam natus ut aspernatur laudantium quos alias optio, doloremque est illo. Consequuntur ex neque quo necessitatibus distinctio libero vitae id quasi, ad asperiores nostrum illum obcaecati aspernatur atque nisi sint quidem inventore eveniet eos voluptatem? Aspernatur sequi odit neque.";
const contactContent = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus deserunt tenetur quibusdam natus ut aspernatur laudantium quos alias optio, doloremque est illo. Consequuntur ex neque quo necessitatibus distinctio libero vitae id quasi, ad asperiores nostrum illum obcaecati aspernatur atque nisi sint quidem inventore eveniet eos voluptatem? Aspernatur sequi odit neque.";

app.get("/", (req, res) => {
    res.render("home", { homeContent: homeStartingContent, posts: post });
})
app.get("/contact", (req, res) => {
    res.render("contact", { contactContent: contactContent });
})
app.get("/about", (req, res) => {
    res.render("about", { aboutContent: aboutContent });
})
app.get("/compose", (req, res) => {
    res.render("compose");
})
app.post("/compose", (req, res) => {
    var postTitle = req.body.postTitle;
    var postBody = req.body.postBody;
    var postObject = { Title: postTitle, Body: postBody };
    post.push(postObject);
    res.redirect("/");
})
app.get("/posts/:topic", (req, res) => {
    postTopic = _.lowerCase(req.params.topic);
    post.forEach(function (post_title) {
        if (_.lowerCase(post_title.Title) === postTopic) {
            res.render("post", { title: post_title.Title, postContent: post_title.Body });
        }
    })
})



app.listen(3000, () => {
    console.log("server is running on port 3000");
})
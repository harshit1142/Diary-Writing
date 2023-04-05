const express= require("express");
const bodyParser= require("body-parser");
const ejs=require("ejs");
const _=require("lodash");
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/DiaryDB');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const postSchema ={
    title:String,
    content:String
};
const Post=mongoose.model("Post",postSchema);

// const post=new Post({
//     title:"ADD TITLE",
//     content:"ADD POST CONTENT"
// });
// post.save();
const app=express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));


let data_post=[];

const homeStart="Whether you’re looking for a tool to record your daily emotions and activities in a reflective Diary, keep track of milestones in a food diary or pregnancy journal, or even record your dreams in a this website.";

const aboutContent="Designed to focus on privacy, your entries are totally private by default! Quickly and easily search through your Diary.";

const contactContent="Gmail :--> harshitpandey98765@gmail.com";

app.get("/",async function(req,res){
   const posts= await Post.find({}).exec();
        // console.log(posts);
     res.render("home",{
        page:"Home",
        content:homeStart,
        posts:posts
     });
});

app.get("/about",function(req,res){
    res.render("post",{
        heading:"About Us",
        content:aboutContent
    })
});

app.get("/contact",function(req,res){
    res.render("post",{
        heading:"Contact Us",
        content:contactContent
    })
});

app.get("/compose",function(req,res){
    res.render("compose");
    
})

app.post("/compose",function(req,res){
    
    const post=new Post({
        title:req.body.txt,
        content:req.body.sentence
});
post.save();
res.redirect("/");   
    // data_post.push(post);
   
});

app.get("/posts/:postName",async function(req,res){
      var required=(req.params.postName);
      const have= await Post.find({_id:required}).exec();
            res.render("post",{
            heading:have[0].title,
            content:have[0].content
        });
        
      });



app.listen(3000,function(){
    console.log("STARTED WEBSITE");
})

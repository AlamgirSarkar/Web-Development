//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
//app engine 
const app = express();
//templating engine 
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true})

const articleSchema = {
    title: String,
    content: String
}

const Article = mongoose.model("Article", articleSchema)

///////////////request targeting all article///////////

//chainable route handler
app.route("/articles")
//get articles from mongodb
.get(function(req, res){
    Article.find(function(err, foundArticles){
       if(!err){
        res.send(foundArticles)
       }
       else{
           res.send(err)
       }
       
    })
})
//post to mongodb via postman
.post(function(req, res){
   
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    })

    //saving the article in db, without the message postman will keep on loading  as it is ecpecting it
    newArticle.save(function(err){
        if(!err){
            res.send("successfully added article")
        }else{
            res.send(err)
        }
    })
})
//delete document
.delete(function(req,res){
    Article.deleteMany(function(err){
        if(!err){
            res.send("successfully deleted")
        }
        else{
            res.send(err)
        }
    })
   
});

//////////request targeting a specific article///////////////////

app.route("/articles/:articleTitle")

.get(function(req,res){
    Article.findOne({title: req.params.articleTitle}, function(err,foundArticle){
         if(foundArticle){
             res.send(foundArticle);
         }
         else{
             res.send("no articles found");
         }
    })
})

.put(function(req,res){
    Article.update(
        {title: req.params.articleTitle},
        {title: req.body.title, content: req.body.content},
        {overwrite: true},
        function(err){
            if(!err){
                res.send("successfully updated")
            }
        }
    )
})
//to update a particular field
.patch(function(req, res){
    Article.update(
        {title: req.params.articleTitle},
        {$set: req.body},
        function(err){
            if(!err){
                res.send("successfully updated")
            }else{
                res.send(err)
            }
        }
    )
})

.delete(function(req,res){
    Article.deleteOne(
        {title: req.params.articleTitle},
        function(err){
            if(!err){
                res.send("successfully deleted")
            }else{
                res.send(err)
            }
        }
    )
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
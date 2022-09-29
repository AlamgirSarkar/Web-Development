
const express = require("express")

const bodyParser = require("body-parser")

const date = require(__dirname + "/date.js");



const app = express();
 items =["buy food", "cook food", "eat food","play tennis"];
 workItems = [];
app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req,res){

     day = date.getDate();

    res.render("list", {listTitle: day, newListItems: items});
    
});

app.post("/", function(req,res){

     item = req.body.newItem;

    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");

    }

    

})

app.get("/work", function(req, res){
res.render("list", {listTitle: "Work List", newListItems: workItems})
})


app.get("/about", function(req, res){
    res.render("about")
})

app.listen(3001, function(){
    console.log("server started at port 3001...")
})
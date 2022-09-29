//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const _= require("lodash")


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
//to serve static files
app.use(express.static("public"));

//connect to database
mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true})

// create database schema
const itemsSchema = {
  name : String
}

// mongoose model based on the schema
// const = mongoose.model(<"SingularCollectionName">,<schemaname>)
const Item  = mongoose.model("Item",itemsSchema)

 const item1 = new Item({
   name: "welcome to your todolist"
  })
  const item2 = new Item({
    name: "hit the button to add a new item"
   })
   const item3 = new Item({
    name: "hit the button to delete a item"
   })

   //put in an array
   const defaultItems = [item1, item2, item3]
   //schema 
   const listSchema = {
     name: String,
     items: [itemsSchema]
   }
   //model
   const List = mongoose.model("List", listSchema)
  
app.get("/", function(req, res) {

  Item.find({}, function(err, foundItems){
    //if there are no items then insert items
    if(foundItems.length === 0){
      Item.insertMany(defaultItems, function(err){
        if(err){
          console.log(err)
        }
        else{
          console.log("successfully saved default items to DB")
        }
       }) 
       res.redirect("/")
    }
    else{
      //if there are items just render them
      res.render("list", {listTitle: "Today", newListItems: foundItems});
    }
  })
});

// express route Parameters
// app.get("/category/:<paramName>",function(req, res{ req.params.paramsName}))
app.get("/:customListName", function(req, res){
  
  const customListName = _.capitalize(req.params.customListName);

  List.findOne({name: customListName}, function(err, foundList){
     if(!err){
       if(!foundList){
         //create a new list
         const list = new List({
          name: customListName,
          items: defaultItems
        })
        list.save()
        res.redirect("/"+customListName)
      
       }
       else{
         //show an existing list
         res.render("list", {listTitle: foundList.name, newListItems: foundList.items})
       }
     }
  })
})



app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;
   
  const item = new Item({
    name: itemName
  })
  if(listName === "Today"){
    item.save()
    res.redirect("/");
  }else{
    //if request from custom list 
    List.findOne({name: listName}, function(err, foundList){
      foundList.items.push(item)
      foundList.save()
      res.redirect("/" + listName)
    })
  }
});


app.post("/delete", function(req,res){
 const checkedItemId = req.body.checkbox;

const listName = req.body.listName;

if(listName === "Today"){

  //delete the checked item
  Item.findByIdAndRemove(checkedItemId, function(err){
    if(!err){
      console.log("successfully deleted")
      res.redirect("/")
    }
  })
}
else {
List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err,foundList){
  if(!err){
    res.redirect("/" + listName);
  }
})
}
})



// app.get("/work", function(req,res){
//   res.render("list", {listTitle: "Work List", newListItems: workItems});
// });

// app.get("/about", function(req, res){
//   res.render("about");
// });

app.listen(3002, function() {
  console.log("Server started on port 3002");
});

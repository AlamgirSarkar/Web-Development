const express = require("express")

const app = express();

app.get("/", function(request,response){
response.send("<h1>hello world!!</h1>")

});

app.get("/contact" , function(req, res){
    res.send("contact me at...")
})

app.get("/about" , function(req, res){
    res.send("my name is anthony gonsalves...")
})
app.get("/hobbies" , function(req, res){
    res.send("<ul><li>coffee</li><li>beer</li><li>code</li></ul>")
})

app.listen(3000, function(){
    console.log("server started on port 3000...")
})




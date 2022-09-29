
const mongoose = require('mongoose')

//connect to url
mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true })

const fruitSchema = new mongoose.Schema({

    name: {
        type: String,
        //validation
        required: [true, "please specify name"]
    },
    rating:{
        type: Number,
        //mongoose validation
        min: 1,
        max:  10
    } ,
    review: String
})

//mongoose model with fruit document

const Fruit = mongoose.model("Fruit", fruitSchema)

const fruit = new Fruit({
    name: "peaces",
    rating: 10,
    review: "peaces are yummy"
})
//save fruit doc inside the db
//fruit.save()

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
})

const Person = mongoose.model("Person", personSchema)

const mango = new Fruit({
    name : "mango",
    score: 10,
    review: "best fruit"
})

mango.save();

Person.updateOne({name: "john"}, {favouriteFruit: mango}, function(err){
    if(err){
        console.log(err)
    }else{
        console.log("succesfully updated john")
    }
})

// const person = new Person({
//     name: "Amy",
//     age: 12,
//     favouriteFruit: pineapple
// })

//person.save()

// const kiwi = new Fruit({
//     name: "kiwi",
//     score: 10,
//     review: "the best"
// })
// const orange = new Fruit({
//     name: "orange",
//     score: 8,
//     review: "sour"
// })
// const banana = new Fruit({
//     name: " banana",
//     score: 10,
//     review: "weird"
// })
//insert items 
// Fruit.insertMany([kiwi,orange,banana], function(err){
//     if(err){
//         console.log(err)
//     }else{
//         console.log("Successfully saved all fruits to fruitsDB ")
//     }
// })


//for reading docs
Fruit.find(function(err, fruits){
    if(err){
        console.log(err)
      
       
    }
    else{
          //for closing the connection
        mongoose.connection.close();
        console.log(fruits)
        //for dispalying only the name 
        fruits.forEach(function(fruit){
            console.log(fruit.name)
        })
    }
})
//update record
// Fruit.updateOne({_id: "606c35726b926602c4393e74"},{name: "pineapple"}, function(err){
//     if(err){
//         console.log(err)
//     }else{
//         console.log("successfully updated")
//     }
// })


//delete one record
// Fruit.deleteOne({name:"pineapple"}, function(err){
//     if(err){
//         console.log(err)
//     }else{
//         console.log("successfully deleted")
//     }
// })


//delete many record
// Person.deleteMany({name:"john"}, function(err){
//     if(err){
//         console.log(err)
//     }else{
//         console.log("successfully deleted all docs")
//     }
// })
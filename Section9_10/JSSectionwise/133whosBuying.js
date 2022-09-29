var names = ["angela", "ben", "jenny","michael", "chole"]

function whosPaying(names){
    var numberOfPeople = names.length
    var randomPersonPosition = Math.floor(Math.random()*numberOfPeople)
    var randomPerson = names[randomPersonPosition];
    console.log( randomPerson + " is going to pay")

}
whosPaying(names)
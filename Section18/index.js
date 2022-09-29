
// native node module
const fs = require("fs")
fs.copyFileSync("file1.txt", "file2.txt")


// need to install these package
var superheroes = require("superheroes");
var supervillain = require("supervillains")

var mySuperheroName = superheroes.random();
var mySuperVillainName = supervillain.random();

console.log(mySuperheroName)
console.log(mySuperVillainName)


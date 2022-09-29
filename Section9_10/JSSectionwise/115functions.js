function getMilk(money){
    console.log("go straight")
console.log("turn left")
console.log("turn right")

console.log("buy " + calcBottles(money, 20) + " bottles of milk")
return calcChange(money,20)
}

function calcBottles(startingMoney, costPerBottles){
    var numberOfBottles = Math.floor(startingMoney / costPerBottles);
    return numberOfBottles;
}
function calcChange(startingAmount, costPerBottles){
    var change = startingAmount%costPerBottles;
    return change;
}
getMilk(50)

console.log("hello master, here is your " + getMilk(50) + "change")

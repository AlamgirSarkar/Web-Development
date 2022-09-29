var guestList = ['angela','jack','pam', 'lara', 'jason']
console.log(guestList.length)
console.log(guestList[2])

var guestName = prompt("what is your name?")

if(guestList.includes(guestName)){
    alert("welcome")
}else{
    alert("sorry, you are not allowed")
}
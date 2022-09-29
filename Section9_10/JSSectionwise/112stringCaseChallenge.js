var name1 = prompt("what is your name1?")

var firstChar = name1.slice(0,1)

var upperCaseFirstChar = firstChar.toUpperCase()

var restOfname1 = name1.slice(1,name1.length);

restOfname1 = restOfname1.toLowerCase();

var capitalisedname1 = upperCaseFirstChar + restOfname1

alert("hello " + capitalisedname1)
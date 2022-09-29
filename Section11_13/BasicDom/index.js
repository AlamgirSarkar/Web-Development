// document.querySelector("h1").innerHTML = "Good Bye"

// var heading = document.firstElementChild.lastElementChild.firstElementChild
// heading.innerHTML = "hello"
// heading.style.color = "green"

document.getElementsByTagName("li")[2].style.color = "green"
document.getElementsByClassName("btn")[0].style.color = "red"
document.getElementById("title").innerHTML = "bye bye"
// select in hierarchy, item inside list
document.querySelectorAll("#list .item")[2].style.color = "green"

document.querySelector("li a").style.color = "red"
// style attribute is camelCase, values are in quotation mark
document.querySelector("h1").style.fontSize = "5rem"
// background color of button to yellow
document.querySelector("button").style.backgroundColor = "yellow"

// speration of concern means css should be used for style, 
// js for functionality, but js is used to change style on fly

//add class , make the button invisible

document.querySelector("button").classList.add("invisible")
//remove the class
document.querySelector("button").classList.remove("invisible");
//remove if added, add if removed
document.querySelector("button").classList.toggle("invisible")
document.querySelector("button").classList.toggle("invisible")
//adding the class huge
document.querySelector("h1").classList.add("huge")
//text content property using innerHTML. textContent will not give the property

document.querySelector("h1").innerHTML = "<em>GoodBye</em>"

//change attribute

document.querySelector("a").setAttribute("href", "https://www.bing.com")
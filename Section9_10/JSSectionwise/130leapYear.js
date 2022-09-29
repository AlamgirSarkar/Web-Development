function isLeap(year){
    if(year % 4 === 0 ){
        if(year%100 === 0){
            if(year%400 === 0){
                console.log("leap year") 
            }else{
                console.log("not a leap year")
            }
        }else{
            console.log("leap year")
        }
    }else{
        console.log("Not a leap year")
    }
}

isLeap(2000)
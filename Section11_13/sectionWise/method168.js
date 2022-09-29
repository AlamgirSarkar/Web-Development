
function HouseKeeper (yearsOfExperience, name, cleaningRepertoire) {
    this.yearsOfExperience = yearsOfExperience;
    this.name = name;
    this.cleaningRepertoire = cleaningRepertoire;
    this.clean = function (){
        console.log("cleaning in progress...")
    }
}

// obj name start with capital letter, new keyword is required
var HouseKeeper = new HouseKeeper(9, "tom", ["lobby","bedroom"])

HouseKeeper.clean();
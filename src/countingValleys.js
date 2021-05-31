const dict = {
    "D": -1,
    "U": 1
};

function countingValleys(path){
    let level = 0;
    let isValley = false;
    let countValleys = 0;
    for(const char of path){
        level += dict[char];
        if(level === -1){
            isValley = true;
        }
        if(level === 0 && isValley){
            countValleys++;
            isValley = false;
        }
    }
    return countValleys;
}

console.log(countingValleys("UDDDUDUU"));
console.log(countingValleys("DDUUUUDD"));
console.log(countingValleys("DDUUDDUDUUUD"));
console.log(countingValleys("DUDDDUUDUU"));
console.log(countingValleys("DDUUUDDDUUUDDDUUUDDU"));
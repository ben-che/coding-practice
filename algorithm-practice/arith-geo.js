//  Write a function called arithGeo that takes an array of numbers and returns the string "Arithmetic" 
//  if the sequence follows an arithmetic pattern or returns the string "Geometric" if it follows a geometric pattern. 
//  If the sequence doesn't follow either pattern return -1. An arithmetic sequence is one where the 
//  difference between each of the numbers is consistent, where as in a geometric sequence, each term 
//  after the first is multiplied by some constant or common ratio. Arithmetic example: [2, 4, 6, 8] 
//  and Geometric example: [2, 6, 18, 54]. 0 will not be entered, and no array will contain all the same elements.
//  Input:5,10,15 Output:"Arithmetic" Input:2,4,16,24 Output:-1.
 
function arithGeo(numArry) {
    let difference = numArry[1] - numArry[0];
    for (i=1; i < numArry.length; i++) {
        if (numArry[i]-numArry[i-1] !== difference) {
            break;
        }
    return 'Arithmetic';
    }
    let mult = numArry[1] / numArry[0];
    for (i=1; i<numArry.lengthl;i++) {
        if (numArry[i] / numArry [i-1] !== mult){
            break;
        }
    return 'Geometric';
    }
    return -1;
}

//geometric
console.log(arithGeo([2, 6, 18, 54]));
//arthimetic
console.log(arithGeo([2, 4, 6, 8]));
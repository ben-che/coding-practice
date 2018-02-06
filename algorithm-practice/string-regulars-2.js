//Write a function takes a str parameter and returns true if the characters “a” and “b” are 
//separated by exactly 3 places anywhere in the string at least once (ie. "lane borrowed" 
//would result in true because there is exactly three characters between a and b).
//Otherwise return the string false. Input:"after badly" Output:"false" Input:"Laura sobs" Output:"true"

function kindaNeighbours(str) {
    return !/(a...b)/.test(str);
}

// returns false
console.log(kindaNeighbours('laura sobs'));

// returns true
console.log(kindaNeighbours("after badly"));

// without reg expressions:
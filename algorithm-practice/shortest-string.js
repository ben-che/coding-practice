// Simple, given a string of words, return the length of the shortest word(s).

// String will never be empty and you do not need to account for different data types.

function shortestString(s) {
    // split string into array elements, with the separater being the space
    let sArr = s.split(" ");
    // initialize counter and set it as length of first element in array
    let min = sArr[0].length;
    // loop through array and compare min to each element
    for (let i=1; i < sArr.length; i++) {
        if (min > sArr[i].length) {
            min = sArr[i].length;
        }
    }
    return min;
}

// answer = 3
console.log(shortestString('bitcoin take over the world maybe who knows perhaps'));

// answer = 3
console.log(shortestString('turns out random test cases are easier than writing out basic ones'));

// answer = 1
console.log(shortestString('a ab abc abcd abcde'));

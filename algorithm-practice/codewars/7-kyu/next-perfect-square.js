// You might know some pretty large perfect squares. But what about the NEXT one?

// Complete the findNextSquare method that finds the next integral perfect square after the one passed as a parameter. 
//  Recall that an integral perfect square is an integer n such that sqrt(n) is also an integer.

// If the parameter is itself not a perfect square, then -1 should be returned. You may assume the parameter is positive.

// Examples:

// findNextSquare(121) --> returns 144
// findNextSquare(625) --> returns 676
// findNextSquare(114) --> returns -1 since 114 is not a perfect

// Whiteboarding:
// 1) Check to see if argument is a perfect square by taking the square root of the input
//      1.1) If it isn't, return -1
// 2) Take the square root of the input, add 1, square it, and then return that output as the answer

function findNextSquare(n) {
    if (!Number.isInteger(Math.sqrt(n))) {
        return -1;
    }
    else {
        return (Math.sqrt(n)+1) * (Math.sqrt(n)+1);
    }
}

// 141
console.log(findNextSquare(121));

// 676
console.log(findNextSquare(625));

// -1
console.log(findNextSquare(155));


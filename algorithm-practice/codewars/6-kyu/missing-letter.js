// Find the missing letter

// Write a method that takes an array of consecutive (increasing) letters as input and that returns the missing letter in the array.

// You will always get an valid array. And it will be always exactly one letter be missing. The length of the array will always be at least 2.
// The array will always contain letters in only one case.

// Example:

// ['a','b','c','d','f'] -> 'e'
// ['O','Q','R','S'] -> 'P'


// ===================================

// Whiteboarding:
// 2 variables are needed - a current variable and a look-ahead variable
// Loop through the array, and convert each element to an ascii code 
// 

function missingLetter(arr) {
    let current, next;
    for (let i = 0; i < arr.length; i++) {
        current = arr[i];
        next = arr[i+1];
        if ((next.charCodeAt(0) - current.charCodeAt(0)) > 1) {
            return String.fromCharCode(current.charCodeAt(0) + 1);
        }
    }
}

// e
console.log(missingLetter(['a','b','c','d','f']));
// P
console.log(missingLetter(['O','Q','R','S']));

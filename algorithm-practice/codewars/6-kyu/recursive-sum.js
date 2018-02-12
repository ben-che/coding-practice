// In this kata, you must create a digital root function.

// A digital root is the recursive sum of all the digits in a number. Given n, take the sum of the digits of n. 
// If that value has two digits, continue reducing in this way until a single-digit number is produced. 
// This is only applicable to the natural numbers.

// Whiteboarding:
// if n > 10:
    // use recursion to call digitalRoot once more, and pass it the recursive sum of the original argument as an argument
// if n < 10:
    // return number as answer

function digitalRoot(n) {
    if (n >= 10) {
        return (digitalRoot((n % 10) +  digitalRoot(Math.floor(n/10))));
    }
    if (n < 10) {
        return n;
    }
}

// 2
console.log(digitalRoot(191));

// 4
console.log(digitalRoot(211));

// 0
console.log(digitalRoot(0));

// 1
console.log(digitalRoot(10));

// 9
console.log(digitalRoot(99));

// 6
console.log(digitalRoot(942));
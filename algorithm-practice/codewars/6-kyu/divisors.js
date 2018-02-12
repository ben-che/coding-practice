// Create a function named divisors/Divisors that takes an integer and returns an array with all of the integer's divisors(except 
// for 1 and the number itself). If the number is prime return the string '(integer) is prime' 

// Example:
// divisors(12); // should return [2,3,4,6]
// divisors(25); // should return [5]
// divisors(13); // should return "13 is prime"
// You can assume that you will only get positive integers as inputs.

// Whiteboarding:
// loop through every number (excluding 1 and 0) and test to see if the number is divisible by n
//      if it is, push to array
// at the end of the loop, if the array is still empty, it means there were no divsors and n is a prime number
//      else, return array as answer

function divisors(n) {
    let divisors = [];
    for (let i=2; i < n; i++) {
        if (n%i === 0) {
            divisors.push(i);
        }
    }
    if (divisors.length === 0) {
        return n +' is prime';
    }
    else {
        return divisors;
    }
}


console.log(divisors(12));

console.log(divisors(25));

console.log(divisors(13));
// Write a function called timeConvert that takes a num parameter and returns the number of hours and minutes the parameter converts to 
// (ie. if num = 63 then the output should be 1:3). 
// Separate the number of hours and minutes with a colon. 
// Test Cases:
// Input:126 Output:"2:6" 
// Input:45 Output:"0:45"
// Input: 1000 Output:

function timeConvert(n) {
    let hr = convertHr(n);
    let min = convertMin(n);
    return hr + ":" + min;
}

// convert n to hours
function convertHr(n) {
    return Math.floor(n / 60);
}

// convert n to minutes
function convertMin(n) {
     return n % 60;

}

// test cases:
console.log(timeConvert(100));
console.log(timeConvert(60));
console.log(timeConvert(45));
console.log(timeConvert(63));
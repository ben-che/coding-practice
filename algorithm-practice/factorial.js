// Write a function that takes the num parameter being passed and returns the factorial of it 
// (e.g. if num = 4, return (4 * 3 * 2 * 1)).
// Test Cases - Input:4 Output:24; Input:8 Output:40320

console.log(factorial(4));
console.log(factorial(8));

function factorial(n) {
    let answer = 1;
    for (let i = 1; i <= n; i++) {
        answer *= i;
    } return answer;
};
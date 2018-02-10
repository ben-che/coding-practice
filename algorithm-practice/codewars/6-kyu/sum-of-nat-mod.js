// If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.

// Finish the solution so that it returns the sum of all the multiples of 3 or 5 below the number passed in.

// Note: If the number is a multiple of both 3 and 5, only count it once.


// ==========================
// Whiteboarding:
//===========================
// The naive way to solve this problem is to check if each number is a multiple of three or five, and then add it to 
// a sum variable:

function sumMultiple(n) {
    let answer = 0;
    n=n-1;
    while (n > 0) {
        if (n % 3 === 0 || n % 5 === 0) {
            answer += n;
        }
        n = n-1;
        console.log(answer);
    }
    return answer;
}

sumMultiple(10);

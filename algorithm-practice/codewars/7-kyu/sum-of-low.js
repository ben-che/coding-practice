// Create a function that returns the sum of the two lowest positive numbers given an array of minimum 4 integers. No floats or empty arrays will be passed.

// For example, when an array is passed like [19, 5, 42, 2, 77], the output should be 7.

// [10, 343445353, 3453445, 3453545353453] should return 3453455.

// Hint: Do not modify the original array.

// ===============
// Whiteboarding:
// Use Array.sort along with a anonymous function to sort the list from low to high, then add the two items in the [0] and [1] index of
//   the array
function sumLow (arr) {
    let sorted = arr.sort((a, b) => {return a - b});
    return sorted[0] + sorted[1];
}

console.log(sumLow([19, 5, 42, 2, 77]));
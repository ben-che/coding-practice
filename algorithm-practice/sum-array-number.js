// given an array and a number, return indicies of first two numbers that sum
//  to given number
// ex. [1,2,3,4,5,0], 4 => 0,2

function sumFunction(arr, n) {
    for (let i = 0; i < arr.length; i ++) {
        if (arr.indexOf(n-arr[i]) > 0) {
            console.log(i, arr.indexOf(n-arr[i]))
            return 
        }
    }
    return false
}

sumFunction([1,2,3,4,5,0], 4)
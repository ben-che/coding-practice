// Given an array, you must increment any duplicate elements until all its elements are unique. In addition,
// the sum of its elements must be the minimum possible within the rules. For example, if arr = [3, 2, 1, 2, 7],
// then arr = [3, 2, 1, 4, 7] and its elements sum to a minimal value of 3 + 2 + 1 + 4 + 7 = 17.

function uniqueMinSum(arr) {
    let sortedArray = arr.sort();
    
	let sum = sortedArray[0];
	let prev = sortedArray[0];

	for (let i = 1; i < sortedArray.length; i++) {
        let current = sortedArray[i];
		if (sortedArray[i] <= prev) {
			current = sortedArray[i] + 1;
		}

		sum += current;
		prev = current;
	}
	console.log(sum);
}

uniqueMinSum([3, 2, 1, 4, 7]); // 17
uniqueMinSum([3, 3, 1, 4, 7]); // 20
// Given an array nums, there is a sliding window of size k which is moving from the
// very left of the array to the very right. You can only see the k numbers in the window.
// Each time the sliding window moves right by one position, return the max number inside
// the sliding window.

const testArr = [1, 2, 3, 4, 5];
const testArr2 = [3, 41, 2, 31, 312, 4, 12, 3];

function slidingWindow(arr, k) {
	for (let i = 0; i + k <= arr.length; i++) {
		let windowArray = [];
		for (let j = 0; j < k; j++) {
			windowArray.push(arr[i + j]);
		}
		console.log(Math.max(...windowArray));
	}
}

slidingWindow(testArr, 3);
slidingWindow(testArr2, 2);

// Variant:

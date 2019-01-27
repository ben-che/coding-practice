// Two strings are said to be twins only if they can be made equivalent by performing some number of
// operations on one or both strings. There are two possible operations:
// SwapEven: Swap a character at an even-numbered index with a character at another even-numbered
// index.
// SwapOdd: Swap a character at an odd-numbered index with a character at another odd-numbered
// index.
// For example, given the strings abcd, and cbad, you could swap elements values a and c in the first array
// to get cbad, so the strings are twins. If the strings are abcd and adbc, whether you swap the two even
// index items or the two odd, the two will never match so they are not twins.
// You will be given multiple pairs of strings to test and must return an array of strings either "Yes" or "No"
// based on whether they are twins. There should be one string added to the array per test in the order the
// pairs are given.

// Input:
// a = [['c','d','a','b'], ['d','c','b','a'], ['a','b','c','d']]
// b = [['a','b','c','d'], ['a','b','c','d'], ['a','b','c','d','c','d']]

// Output:
// [true, false, false]

// Proposed solution:

// push all even elements inside a[i] into an array, push all even elements inside b[i] into another array
// compare the two arrays - if they don't contain the same elements, return false
// do the same for all odd elements next

function twins(a, b) {
	let ans = [];
	for (let i = 0; i < a.length; i++) {
		if (isEqual(a[i], b[i])) {
			ans.push(true);
		} else {
			ans.push(false);
		}
	}
	console.log(ans);
}
// helper function to check equality of two arrays
function isEqual(a, b) {
	let oddA = [];
	let oddB = [];
	let evenA = [];
	let evenB = [];
	if (a.length !== b.length) {
		return false;
	}

	for (let i = 0; i < a.length; i++) {
		if (i % 2 === 0) {
			evenA.push(a[i]);
			evenB.push(b[i]);
		} else {
			oddA.push(a[i]);
			oddB.push(b[i]);
		}
    }
    
    for (let i = 0; i < a.length; i++) {
        if (a.indexOf(b[i]) < 0) {
            return false
        }
        if (b.indexOf(a[i]) < 0) {
            return false
        }
    }

	return true;
}

twins(
	[['c', 'd', 'a', 'b'], ['d', 'c', 'b', 'a'], ['a', 'b', 'c', 'd']],
	[['a', 'b', 'c', 'd'], ['a', 'b', 'c', 'd'], ['a', 'b', 'c', 'd', 'c', 'd']]
);

// given a number, n, find all permutations of possible, valid brackets
// ex.
// 1: ()
// 2: ()(), (())
// 3: ((())), (())(), ()(()), ()()(), (()())

function buildBrackets(n) {
	bracketHelper('', n, n);
}

function bracketHelper(str, openNumber, closeNumber) {
	let newStr = str;
	if (openNumber <= 0 && closeNumber <= 0) {
		console.log(newStr);
	}
	if (openNumber >= 1) {
		bracketHelper(newStr + '(', openNumber - 1, closeNumber);
	}
	if (closeNumber >= 1 && openNumber < closeNumber) {
		bracketHelper(newStr + ')', openNumber, closeNumber - 1);
	}
}

console.log('n = 1');
buildBrackets(1);
console.log('n = 2');
buildBrackets(2);
console.log('n = 3');
buildBrackets(3);

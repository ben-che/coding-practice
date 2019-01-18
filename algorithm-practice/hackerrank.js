'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
	inputString += inputStdin;
});

process.stdin.on('end', function() {
	inputString = inputString.split('\n');

	main();
});

function readLine() {
	return inputString[currentLine++];
}

/*
 * Complete the 'textQueries' function below.
 *
 * The function accepts following parameters:
 *  1. STRING_ARRAY sentences
 *  2. STRING_ARRAY queries
 */

// input:
// jim likes mary
// kate likes tom
// tom does not like jim
//
// jim tom
// likes

// output:
// 2
// 0 1

const s = ['jim likes mary', 'kate likes tom', 'tom does not like jim'];
const q = ['jim tom', 'likes'];

function textQueries(sentences, queries) {
	for (let i = 0; i < queries.length; i++) {
		let splitQuery = queries[i].split(' ');

		let answerArr = [];
		for (let j = 0; j < sentences.length; j++) {
			let splitSentence = sentences[j].split(' ');
			let hits = 0;
			for (let k = 0; k < splitQuery.length; k++) {
				for (let h = 0; h < splitSentence.length; h++) {
					if (splitSentence[h] === splitQuery[k]) {
						hits += 1;
					}
				}
			}
			if (hits === splitQuery.length) {
				answerArr.push(j);
			}
		}
		console.log(answerArr);
	}
}
textQueries(s, q);

// function textQueries(sentences, queries) {
// 	for (let i = 0; i < sentences.length; i++) {
// 		let splitSentence = sentences[i].split(' ');

// 		for (let j = 0; j < queries.length; j++) {
// 			let splitQuery = queries[j].split(' ');

// 			// loop thru split query
// 			for (let k = 0; k < splitQuery.length; k++) {
// 				// check each element of query against each element of sentence
// 				let hits = 0;
// 				let answerArr = [];
// 				for (let h = 0; h < splitSentence.length; h++) {
// 					if (splitSentence[h] === splitQuery[k]) {
// 						hits += 1;
// 						break;
// 					}
// 				}

// 				// at the end of looping through all senteces and queries
// 				if (hits === splitQuery.length) {
// 					console.log(i);
// 					console.log(splitSentence);
// 					console.log(splitQuery.length);
// 					answerArr.push(i);
// 				}
// 				// console.log(answerArr);
// 			}
// 		}
// 	}
// }

// function textQueries(sentences, queries) {
// 	// Write your code here
// 	let answerArr = [];
// 	// loop thru sentences - each element is string
// 	for (let i = 0; i < sentences.length; i++) {
// 		// loops thru queries - each element is string, need to split
// 		for (let j = 0; j < queries.length; j++) {
// 			let oneQueryArray = queries[j].split(' ');
// 			// loop thru all query strings
// 			for (let k = 0; k < oneQueryArray.length; k++) {
// 				// ensure that hits === query strings array length
// 				let hits = 0;
// 				let splitSentence = sentences[i].split(' ');
// 				// loop thru sentence and check to ensure all of query strings are there
// 				for (let h = 0; h < splitSentence.length; h++) {
// 					// console.log(splitSentence[h]);
// 					// console.log(oneQueryArray[1]);
// 					// return;
// 					if (splitSentence[h] === oneQueryArray[k]) {
// 						hits++;
// 						console.log(splitSentence[h]);
// 						console.log(oneQueryArray[k]);
// 						// return;
// 					}
// 				}
// 				if (hits !== oneQueryArray.length) {
// 					console.log(hits);
// 					console.log(splitSentence);
// 					// console.log(i);
// 				}
// 			}
// 		}
// 	}
// 	// console.log(answerArr);
// 	// return answerArr;
// }

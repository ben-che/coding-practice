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

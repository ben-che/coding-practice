// Algo question:
// Write a function called findSequence that accepts two sequences and returns the longest subsequence common to the passed in sequences.

// ex. findSequence("abcdefg", "bfghr") => "bfg"


function findSequence(x, y) {
    // Find shorter sequence, and use it to loop through longer one
    let longerSequence = x.length >= y.length? x : y;
    let shorterSequence = x.length >= y.length? y : x;

    let sequenceString = "";

    for (let i = 0; i < shorterSequence.length; i++) {

        for(let j = i; j < longerSequence.length; j++) {

            if (shorterSequence[i] === longerSequence[j]) {
                sequenceString += longerSequence[j]
                break;
            }
        }

    }

    return sequenceString

  }

console.log(findSequence("abcdef", "abf"))
console.log(findSequence("abcdefg", "bfghr"))
console.log(findSequence("bfghr", "abcdefg"))
console.log(findSequence("abcabc", "abc"))
console.log(findSequence("123456789", "132535365"))

// React question:
// Create a React countdown timer that counts down from 60.
// When it reaches 0, replace the timer with "Time's Up"
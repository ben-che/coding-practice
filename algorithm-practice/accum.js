// This time no story, no theory. The examples below show you how to write function accum:

// accum("abcd");    // "A-Bb-Ccc-Dddd"
// accum("RqaEzty"); // "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy"
// accum("cwAt");    // "C-Ww-Aaa-Tttt"

// The parameter of accum is a string which includes only letters from a..z and A..Z.

// Whiteboarding:
// Function takes string input, iterates over each character and returns each letter n + 1 number of times, where n is the index of the
//      character, with the first character capitalized. When the character is done being iterated over, a hyphen is concatenated to the
//      end.

function accum(str) {
    // Declare and init string variable
    let output = "";
    // Loop through each character in the string
    for (let i = 0; i < str.length; i++) {
        // Concat and captialize first character to output 
        output += str[i].toUpperCase();
        // Concat the same character, but in lower case Index + 1 amount of times
        for (let j = 0; j < i; j++) {
            output += str[i].toLowerCase();
        }
        // Concat that hyphen!
        output += "-";
    }
    // Drop the last hyphen
    output = output.slice(0,-1);
    return output;
}

console.log(accum("abcd"));

console.log(accum("RqaEzty"));

console.log(accum("cwAt"));
// Create a function that takes in a str parameter and will determine if it is an acceptable sequence by either returning true or false. 
// The str parameter will be composed of + and = symbols with several letters between them (ie. ++d+===+c++==a) and for the string to 
// be true each letter must be surrounded by a + symbol. So the string to the left would be false. The string will not be empty and 
// will have at least one letter. 

// Test Case:
// Input:"+d+=3=+s+" Output:"true"; 
// Input:"f++d+" Output:"false"


// Whiteboarding:
// Match
// +++++d++++
// ++r++++++
// =3======
// =====6===

// Skip
// f==
// 3++++

// Rules:
// 1. Cannot start with a letter or number 
//  ^[a-z]|^[0-9]
// 2. Cannot end with a letter or number
//  [a-z]$|[0-9]$
// 3. "=" is followed by a number
//  [^=][0-9]
// 4. "+" is followed by a letter
//  [^+][a-z]
// 5. [a-z] must be followed with a "+"
//  [a-z][^+]
// 6. [0-9] must be followed with a "="
//  [0-9][^=]

function regexSolution(str) {
    return !/^[a-z]|^[0-9]|[^=][0-9]|[0-9][^=]|[^+][a-z]|[a-z][^+]|[0-9]$|[a-z]$/i.test(str);
}

// tests:
// true
console.log(regexSolution("++++d+++++"));
//false
console.log(regexSolution("w++++d+++++"));
//false
console.log(regexSolution("++++d+++++d"));
//false
console.log(regexSolution("9==="));
//true
console.log(regexSolution('====9===='));
//false
console.log(regexSolution('=======9'));
//false
console.log(regexSolution('===d===='));
//false
console.log(regexSolution('+++++2++++'));
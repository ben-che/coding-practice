// Write a function that takes in a string and will capitalize every vowel and reverse the string. 
// Once completed return the newly modified string. 
// Test Case - Input: “Did every vowel get capitalized?” Output: “?dEzIlAtIpAc tEg lEwOv YrEvE diD”
let answer = ""

function strManipulation(str) {
    for (let i=0; i <= str.length; i++) {
        if ((/^[aeiou]$/i).test(str[i])) {
            answer = answer.concat(str[i].toUpperCase());  
        }
        else if (i === (str.length)) {
            answer = answer.split("").reverse().join("");
            return answer;
        }
        else {
            answer = answer.concat(str[i]);
        }
    }
}
console.log(strManipulation('Did every vowel get capitalized?'));
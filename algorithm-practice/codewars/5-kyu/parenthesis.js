// Write a function called that takes a string of parentheses, and determines if the order of the parentheses is valid. 
// The function should return true if the string is valid, and false if it's invalid.

// Examples
// "()"              =>  true
// ")(()))"          =>  false
// "("               =>  false
// "(())((()())())"  =>  true
// Constraints
// 0 <= input.length <= 100

// You may assume that the input string will only contain opening and closing parenthesis and will not be an empty string.

// Whiteboarding:
// Loop through each character of the string and check the character
// Set a counter variable and add / subtract it depending on the following conditions:
//  1. If the parenthesis is open - add one to the counter variable
//  2. If the parenthesis is closed - subtract one from the counter variable
//  3. If counter variable is ever less than zero, it means that there is a closing bracket
//          that does not have an opening counterpart - at this point, return false
//  4. If the counter variable is not equal to zero at the end of the string, it means there is
//          not a closing counterpart for an opening bracket

function validParentheses(parens){
    // init counter variable
    let counter = 0;
    // loop through parens string variable
    for (i = 0; i < parens.length; i++) {
        // if counter ever drops below 0, return false - there will be a closing bracket that does
        //      not have an opening counterpart
        if (counter >= 0) {
            // add one to counter for opening, subtract one for closing
            if (parens[i] === "(") {
                counter += 1;
            }
            else if (parens[i] === ")") {
                counter -= 1;
            }
            // catch any erroroneous input
            else {
                return "error";
            }
        }
        else {
            return false;
        }
    }
    // if the loop is successful in completion, check to see if there were as many closing 
    //      brackets as there were opening
    if (counter === 0) {
        return true;
    }
    else {
        return false;
    }
  }

// returns true
console.log(validParentheses('()'));
console.log(validParentheses('(())((()())())'));

// returns false
console.log(validParentheses(')(()))'));
console.log(validParentheses('('));

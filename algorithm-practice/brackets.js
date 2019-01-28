// given a string of two different types of brackets,
// return true of all opening brackets are closed
// ex. "(())" => true
//      ()())() => false

function brackets(str) {
    let counter = 0;
    for (let i = 0; i < str.length; i++) {
        if (counter < 0) {
            return false
        }
        if (str[i] === "(") {
            counter++
        }
        else {
            counter--
        }
    }
    if (counter === 0) {
        return true
    }
    return false
}

console.log(brackets("()()()")) // true
console.log(brackets(")(()()()")) // false
console.log(brackets("()()()((()))")) // true

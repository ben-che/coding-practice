// 3 main ways of doing conditional flow in javascript:

// If / Else:
//  Often used when there's a series of boolean checks that you want to do - 
//  For example - think about assigning letter grades to a class based on their
//  numerical grade:
//  If the student has somewhere between a 100 to 90, then give them an A,
//  else, if the student has somewhere between an 80 - 89, then give them a B,
//  etc etc...
//  The syntax goes as follows:

let ifElseExample = () => {
    if (argOne) {
        // if argOne evaluates to true, then console log "1"
        // if argOne evaluates to false, then move to the next if statement
        console.log(1)
    }
    
    else if (argTwo) {
        // if argTwo evaluates to true, then console log "2"
        // if argTwo evaluates to false, then move to the next if statement
        console.log(2)
    }
    
    else {
        // if none of the previous if statements are true, then console log 3
        console.log(3)
    }
}

// Writing the number / letter grades example from above:


// Switch statements:
//  Used when you know specific cases that the arguments will fall into
//  The general idea is the same as an if/else though - if a case is true,
//  then go within that case's block, and if not, then move on to the next case
//  An example of switch statements can be found in restaurant orders:
//  A customer orders Sandwich C. The chef checks to see which case the customer
//  orders, and then starts to prepare the sandwich
//  Syntax goes as follows:
let switchExample = (sandwich) => {
    switch(argument) {
        case (argument === "One") :
            console.log(1)
            break;
        case (argument === "Two"):
            console.log(2)
            break;
        default:
            console.log("none");
    }
}

// Writing the function:

// Ternary Operator:
//  Used as a quick way to write a true/false - it's used to React to render
//  one thing vs rendering another (think of a modal)
//  Generally, we want to keep the true/false behaviours very short for readability;
//  we shouldn't be defining entire functions or have multiple outputs in a ternary
//  for readability reasons
//  Syantax:

// If a is true, then doTrue(), if a is false, then doFalse()
let ternaryExample = () => {
    a ? doTrue() : doFalse()
}
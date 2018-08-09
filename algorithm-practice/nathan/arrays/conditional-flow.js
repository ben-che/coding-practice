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

// Write the number / letter grades example from above:

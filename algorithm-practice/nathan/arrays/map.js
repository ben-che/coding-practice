// Higher order functions
//  Functions that operate on other functions, either by taking them as arguments or by returning them, are called higher-order functions. 
//  A pretty good read on what higher order functions are, where they came from, why they're important
//  and how they're used: https://eloquentjavascript.net/05_higher_order.html

// Map
// Closest sibling to a for loop - it iterates over each element and operates on it
// The map method will always return an array:
// Syntac goes as follows:

let addOne = () => {
    let numberArray = [1, 2, 3, 4, 5];
    let newArray = numberArray.map( (number, index) => {
        return number + 1
    })
    //  Note that mapping does not mutate the original array, but returns the new one:
    console.log("original array:")
    console.log(numberArray)
    console.log('new array:')
    console.log(newArray)
}


// Filter
// returns an item if the provided condition is true:

let shortNames = () => {
    let names = ["Ben", "Ian","Will","Dani","Shane","Graeme","Alice"];
    let shortNames = names.filter( (name) => {
        return name.length <= 4
    })
    console.log("original names:")
    console.log(names)
    console.log("short names:")
    console.log(shortNames)
}

// shortNames()

// Reduce
// applies a provided accumulator to reduce all values into one:

let groceryAdder = () => {
    let groceryPrices = [1, 2, 3, 4, 5]
    let totalCost = groceryPrices.reduce( (costThusfar, newCost) => {
        return costThusfar + newCost
    })

    console.log(totalCost)
}

// groceryAdder()
// forEach
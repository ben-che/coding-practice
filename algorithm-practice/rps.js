// rockPaperScissors is a function that takes in one argument and returns a string
//  function (userInput:String) => (String)
//  Restrictions:
//   userInput can only be "rock", "paper", "scissors"
//   rockPaperScissors can only return "win", "lose" or "draw"
let rockPaperScissors = (userInput) => {
    // call opponentTurn to generate either rock paper scissors and save it within a variable
    let opponentTurn = opponentTurn();
  
    // conditions to determine whether the player loses, wins, or draws
    // conditions where user draws
    if (userInput === opponentTurn) {
      return "draw";
    }
    // conditions where user wins
    else if (userInput === "rock" && opponentTurn === "scissors" ||
             userInput === "paper" && opponentTurn === "rock" ||
             userInput === 'scissors' && opponentTurn === 'paper') {
      return 'win';
    }
    else if (userInput === "rock" && opponentTurn === "paper" ||
             userInput === "paper" && opponentTurn === "scissors" ||
             userInput === 'scissors' && opponentTurn === 'rock') {
      return 'lose';
    }
    else {
      console.log('error in rockPaperScissors function');
    }
  }
  
  // opponentTurn is a helper function that takes in no arguments and returns a string
  //  function (none) => (String)
  let opponentTurn = () => {
    let rng = Math.ceil((Math.random * 3));
    switch(rng) {
      case 1:
        return "rock"
        break;
      case 2:
        return "paper"
        break;
      case 3:
        return "scissors"
        break;
      default:
        console.log('error in opponentTurn switch statement');
        break;
    }
  }
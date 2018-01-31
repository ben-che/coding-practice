// spoiler machine
//  takes in 2 arguments, a string and a num (in milliseconds)
const cheerio = require('cheerio');
const request = require('request');

// ============= //
// main fn call
// ============= //

movieRecommendation();

// ==================== //
// main fn documentation:
// ==================== //

// spoilerMachine takes in no arguments and returns nothing
// fn (none) -> none
//  side effect: console logs either an error message or a spoiler after a certain amount of time has passed
function movieRecommendation () {
    
    let userInput = "Tron";
    let movieRecList = [];
    
    parseDocument(userInput, movieRecList);

}
// ================ //
// helper functions:
// ================ //

function parseDocument(userInput, movieRecList) {
    // use variables to hold the movie name and spoiler time (converted to seconds from milliseconds)

    // assign the destination url to a variable for request function
    let movieUrl="https://api.themoviedb.org/3/search/movie?api_key=f07a88427ffc5183abd63adf3aa6c187&query=" + (userInput.split(" ").join("+"));
    
    // this uses user input to get movie id
    request(movieUrl, function(error, response, body) {

        // do this if no errors occur and the movie is found in the database:
        if ( (!error) && (((JSON.parse(body)).results.length) !== 0) ) {

            // get movie id to use for search in query
            let movieID=((JSON.parse(body)).results[1]).id;
            console.log(movieID);
            let movieRecUrl = 'https://api.themoviedb.org/3/movie/'+movieID+'/recommendations?page=1&language=en-US&api_key=f07a88427ffc5183abd63adf3aa6c187';

            // this uses movie id attained above to get other recommendations
            request(movieRecUrl, function(error, response, body) {
                
                for (let i = 0; i < JSON.parse(body).results.length; i++){
                    movieRecList.push(JSON.parse(body).results[i].title);
                    console.log(JSON.parse(body).results[i].title);
                }
                
            })
        } 

        // do these if an error occurs or the movie was not found in the database
        else if (error) {
            console.log('error encountered: \n' + error);
        }
        else {
            console.log("your movie was not found in our database");
        }
    }
    )}
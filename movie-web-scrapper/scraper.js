// node packages

const request = require('request');
const $ = require('jQuery');
const readlineSync = require('readline-sync');


// simple cli program that uses the movie database api to get a list of recommended movies after
//  user passes argument
// global variables

let userInput = "";
let movieRecList = [];


// ============= //
// main fn call
// ============= //

movieRecommendation();

// ==================== //
// main fn documentation:
// ==================== //

function movieRecommendation () {

    getMovieID(userInput);
    

}
// ================ //
// helper functions:
// ================ //

// function to get movie id for the api

function getMovieID(userInput) {
    userInput = readlineSync.question('Make recommendations based off of what movie?')

    let movieUrl="https://api.themoviedb.org/3/search/movie?api_key=f07a88427ffc5183abd63adf3aa6c187&query=" + (userInput.split(" ").join("+"));

    // this uses user input to get movie id
    request(movieUrl, function(error, response, body) {

        // do this if no errors occur and the movie is found in the database:
        if ( (!error) && (((JSON.parse(body)).results.length) !== 0) ) {

            // get movie id to use for search in query
            let movieID=((JSON.parse(body)).results[1]).id;
            let movieRecUrl = 'https://api.themoviedb.org/3/movie/'+movieID+'/recommendations?page=1&language=en-US&api_key=f07a88427ffc5183abd63adf3aa6c187';
            getRecommendations(movieID);
        }  

        // do these if an error occurs or the movie was not found in the database
        else if (error) {
            console.log('error encountered: \n' + error);
        }
        else {
            console.log("your movie was not found in our database");
        }
    })
}

// fn to get movie recomendations based on id
// mutates global var movieRecList

function getRecommendations(movieID) {

    // variable to hold movie reccomendation api endpoint
    let movieRecUrl = 'https://api.themoviedb.org/3/movie/'+movieID+'/recommendations?page=1&language=en-US&api_key=f07a88427ffc5183abd63adf3aa6c187';
    
    // get & parse through data
    request(movieRecUrl, function(error, response, body) {
        for (let i = 0; i < JSON.parse(body).results.length; i++){
            movieRecList.push(JSON.parse(body).results[i].title);
        }
        // test to see if reccomended movies show up
        console.log('Recommended movies based on ' +userInput)
        
        movieRecList.forEach(function(element){
            console.log(element);
        })
        
    })
}


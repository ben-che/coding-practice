// requires, server creation
const express = require('express');
const request = require('request');
const keys = require('../../../secretstuff.js');

const app = express();

// ensure server's working, specifiy file locations
app.listen(8080, () => {
    console.log('Server Started on http://localhost:8080');
    console.log('Press CTRL + C to stop server');
  });

app.use(express.static('public'));

// ejs setup
app.set('view engine', 'ejs');

// serving requests
app.get('/', (req, res) => {
    console.log('hit index route');
    let movieTrendingUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=' + keys.secrets.movieDbAPI + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1'
    
    request(movieTrendingUrl, function (error, response, body) {

        // if there was an error with the back end, or if the api is down
        if (error) {
            res.JSON(error);
        }
        // everything works
        else {
            // initializing an array with all of the movie object results
            let parsedBody = ((JSON.parse(body)).results);
            // can use randomIndex to randomly select movies
            let randomIndex = Math.floor(Math.random() * JSON.parse(body).results.length);
            res.render('index', {arr:parsedBody})
            console.log(parsedBody);
        }       
    })
})

// ===============
// MAIN APP ROUTE
// ===============
// this endpoint is the search endpoint. it takes in a get request from the user and returns search results
// calls getMovie, an asynch fn
app.get('/search', (req, res) => {
    console.log(req.query);
    // grab movie ID from user get request, assign it 
    let movieID = req.query.movieId;
    console.log(movieID);

    // Debugging:
    // console.log(movieID)

    // use api key and combine it with user's query to get url to return searches
    let movieDatabaseUrl = 'https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&language=en-US&query='+ movieID + '&api_key=' + keys.secrets.movieDbAPI

    // make request to movie database to retrieve all matching titles
    request(movieDatabaseUrl, function (error, response, body) {

        // if user entered a movie not found in database
        if ( (!error) && (((JSON.parse(body).results.length < 1))) ) {
            res.render('404');
            console.log(error);
            // res.send('movie does not exist in database :(');
        }
        // if there was an error with the back end, or if the api is down
        else if (error) {
            res.render('404');
            console.log(error);
            // res.send('our api is currently experiencing problems');
        }
        // everything works
        else {
            // initializing an array with all of the movie object results
            let parsedBody = ((JSON.parse(body)).results);

            res.render('search', {arr: parsedBody})
            console.log(parsedBody);
        }       
    })
})

// this function is the movie endpoint. it is reached when the user clicks on a search result
app.get('/movie/:movieId', (req, res) => {
    console.log(req.params);
    
    let movieDetailsUrl ='https://api.themoviedb.org/3/movie/' + req.params.movieId + '?api_key=' + keys.secrets.movieDbAPI + '&language=en-US'

    request(movieDetailsUrl, (error, response, body) => {
        //debugging:
        // console.log(body);
        if (error) {
            res.render(404);
            console.log(error);
        }
        else {
            // body is still a string
            console.log(body);
            let parsedDetails = JSON.parse(body);
            console.log(parsedDetails);
            res.render('movie', parsedDetails);
        }
    })

})

// catch all missing pages
app.use(function (req, res, next) {
    res.render('404');
})
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
    res.render('index');
})

// // dummy data
// function getMovies() {
//     return [{
//         title: 'Blade Runner',
//         year: '1982',
//         rated: 'R',
//         released: '25 June 1982',
//         runtime: '1h 57min',  
//         genre: 'Sci-Fi, Thriller',
//         director: 'Ridley Scott',
//         writer: 'Hampton Fancher, David Peoples',
//         actors: 'Harrison Ford, Rutger Hauer, Sean Young, Edward James Olmos',
//         plot: 'A blade runner must pursue and try to terminate four replicants who stole a ship in space and have returned to Earth to find their creator.',
//         language: 'English',
//         country: 'USA, Hong Kong'
//     },
//     {   title: 'Princess Mononoke',
//         year: '1997',
//         rated: 'PG-13',
//         released: 'October 29, 1999',
//         runtime: '2h 14min',  
//         genre: 'Anime',
//         director: 'Hayao Miyazaki',
//         writer: 'Hayao Miyazaki',
//         actors: 'Yōji Matsuda, Yuriko Ishida, Yūko Tanaka',
//         plot: 'Ashitaka, a prince of the disappearing Ainu tribe, is cursed by a demonized boar god and must journey to the west to find a cure. Along the way, he encounters San, a young human woman fighting to protect the forest, and Lady Eboshi, who is trying to destroy it. Ashitaka must find a way to bring balance to this conflict.',
//         language: 'Japanese',
//         country: 'Japan'}
//     ]}
    
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

    // use api key and combinne it with user's query to get url to return searches
    let movieDatabaseUrl = 'https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&language=en-US&query='+ movieID + '&api_key=' + keys.secrets.movieDbAPI

    // make request to movie database to retrieve all matching titles
    request(movieDatabaseUrl, function (error, response, body) {

        // if user entered a movie not found in database
        if ( (!error) && (((JSON.parse(body).results.length < 1))) ) {
            // redirect user to 404, or search again page
            res.send('error');
            // res.render('404');
            console.log(error);
            console.log('');
        }
        // if there was an error with the back end, or if the api is down
        else if (error) {
            res.JSON(error);
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
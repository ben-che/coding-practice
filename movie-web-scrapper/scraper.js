// script to scrape boxofficemojo.com to return highest grossing movies

const request = require('request');
const cheerio = require('cheerio')


// create movie obj constructor
function Movie(rank, name, studio, revenue) {
    this.rank = rank;
    this.name = name;
    this.year = year;
    this.revenue = revenue;
}

// create movie instance
let movieData = new Movie([],[],[],[]);

request("http://www.boxofficemojo.com/alltime/world/", function(error, response, body) {
    if (error) {
        console.log(error);
    }
    else {
        let $=cheerio.load(body);

        // select all movie titles and assign it to movieNames variable
        let movieNames = $('td[valign="top"] table tbody tr td font[size="2"] a');
        // iterate through each movie title and add it to the movieData.name array
        $(movieNames).each(function(i, elem) {
            movieData.name.push($(this).text());
        })

        //select all movie years and assign it to movieYear variable

        // iterate through each movie title and add it to the movieYear array
        // check to see if movie names are assigned correctly, and if the unneeded titles are dropped
        console.log(movieData.name);
    }
})


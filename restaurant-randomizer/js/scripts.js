// grab secrets
const keys = require( "../../secrets.js");
const express = require('express');

// express server
let app = express();
app.use(express.static('../'));

// node packages
let request = require('request');

// ****************
// test cases *****
// ****************
// some sort of location variable is required
let location = {
    address:'50 westwood ave',
    city: 'hamilton',
    province: 'ontario',
    country:'canada'
}

// some categories like 'indian' need to be changed into a string that the api accepts, like 'indpak'
// should list options as a dropdown menu or auto complete
let category = "japanese";
// max radius is 40000 meters
let radius ="5000";

// test command:
// userQuery(location,category,radius);

// ****************

// main function to make api requests to yelp
function userQuery(location, category, radius) {
    request.get('https://api.yelp.com/v3/businesses/search?location=' + location.address + "," +location.city +","+location.province+','+location.country+'&categories='+category +'&radius=' + radius, {
        headers : {
            'Authorization': 'Bearer '+ keys.data.yelpAPI
        }
    },  (error, res, body) => {
        
        let queryData = JSON.parse(body);
        console.log('the yelp api returns: '+ JSON.stringify(queryData));
        let queryDataLength = queryData.businesses.length;
        // no results:
        if (queryDataLength < 1) {
            console.log('no results. be a bit more specific with your location! there may be more than one ' + location)
        }

        else {
            // debuggin *******************
            // console.log(queryData.businesses[0]);
            // console.log(queryDataLength);
            // ****************************

            // random restaurant information is held here
            let randomRestuarantData = restaurantRandomizer(queryData, queryDataLength);
            // debugging - ensure restaurantRandomizer fn works
            // console.log(randomRestuarantData);

            // grab the elements to display:
            let name = randomRestuarantData.name;
            let image = randomRestuarantData.image_url;
            let rating = randomRestuarantData.rating;
            let price = randomRestuarantData.price;
            let address = randomRestuarantData.location.address1;
            let yelpUrl = randomRestuarantData.url;
            console.log(yelpUrl);
            return yelpUrl;
            // debugging - ensure that all selectors work
            console.log('name: ' + name + ' image: ' + image + ' rating: ' +rating+ ' price: ' +price + ' address: ' + address + 'yelp url: ' + yelpUrl);
        }
    })
}

// randomly pick one restaurant from the query results
function restaurantRandomizer(queryData, queryDataLength) {
    let randomNumber = Math.floor((Math.random() * Number(queryDataLength)));
    let randomRestaurant = queryData.businesses[randomNumber];
    return randomRestaurant;
}


// api endpoint

app.get('/result', (req, res) => {
    
    let inputLocation = {
        // address: req.query.address,
        city: req.query.city,
        // province: req.query.province,
        // country: req.query.country
    }
    let inputCategory = req.query.category;
    // max radius is 40000 meters
    let inputRadius = req.query.radius;

    console.log(req.query);
    console.log(req.query.city);
    console.log(req.query.radius)
    let yelpUrl = String(userQuery(inputLocation, inputCategory, inputRadius));
    
    // redirect to random restaurant yelp page
    res.redirect(yelpUrl);
    
})

// // server's listening.
app.listen('8080', ()=> {
    console.log('listening to port 8080');
})
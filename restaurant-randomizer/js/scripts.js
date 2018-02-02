// grab secrets
let keys = require( "../../secrets.js");

// node packages
let request = require('request');

// test vars
// some sort of location variable is required
let location = {
    address:'35 hayden street',
    city: 'toronto',
    province: 'ontario',
    country:'canada'
}

// some categories like 'indian' need to be changed into a string that the api accepts, like 'indpak'
// should list options as a dropdown menu or auto complete
let category = "indpak";
// max radius is 40000 meters
let radius ="500";

userQuery(location,category,radius);

// main function to make api requests to yelp
function userQuery(location, category, radius) {
    request.get('https://api.yelp.com/v3/businesses/search?location=' + location.address + "," +location.city +","+location.province+','+location.country+'&categories='+category +'&radius=' + radius, {
        headers : {
            'Authorization': 'Bearer '+ keys.data.yelpAPI
        }
    },  (error, res, body) => {
        
        let queryData = JSON.parse(body);
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

            // debugging - ensure that all selectors work
            console.log('name: ' + name + ' image: ' + image + ' rating: ' +rating+ ' price: ' +price + ' address: ' + address);
        }
    })
}

// randomly pick one restaurant from the query results
function restaurantRandomizer(queryData, queryDataLength) {
    let randomNumber = Math.floor((Math.random() * Number(queryDataLength)));
    let randomRestaurant = queryData.businesses[randomNumber];
    return randomRestaurant;
}

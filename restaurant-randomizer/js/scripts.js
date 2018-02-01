// grab secrets
let keys = require( "../../secrets.js");

// node packages
let request = require('request');

// test vars
let location = "toronto";
let category = "bars";
let radius ="1000";


// main function to make api requests to yelp
function userQuery(location, category, radius) {
    request.get('https://api.yelp.com/v3/businesses/search?location=' + location +'&categories='+category +'&radius=' + radius, {
        headers : {
            'Authorization': 'Bearer '+ keys.data.yelpAPI
        }
    },  (error, res, body) => {
        let queryData = JSON.parse(body);
        let queryDataLength = queryData.length;

        // debuggin *******************
        console.log(queryData);
        console.log(queryDataLength);
        // ****************************
    })
}

function restaurantRandomizer(queryData, queryDataLength) {
    let randomNumber = (Math.random() * queryDataLength);
}

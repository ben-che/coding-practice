const express = require('express'),
      bodyParser = require('body-parser');
      app = express();


// allow express server to serve cross origin requests
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// enable the use of body-parser middleware to help parse post requests
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

// global variable cart
let cart =[];

// fake products database
let database = [
    [{
        key: 1,
        id : 1,
        name: 'sadboi bucket',
        price: 40,
        picture: '/imgs/sadboi.jpg',
        type:'hat',
        desc:'the saddest of hats'
    }, {
        key: 2,
        id : 2,
        name: 'shib snapbacc',
        price: 40,
        picture: '/imgs/shib.jpg',
        type:'hat',
        desc:'he do a bork'
    }, { 
        key: 3,
        id : 3,
        name: 'datbot 5-panel',
        price: 40,
        picture: '/imgs/datboi.jpg',
        type:'hat',
        desc:'5-panel of years past'
    }], 
    [
        {
        key: 4,
        id : 4,
        name: 'crispy crocs',
        price: 20,
        picture: '/imgs/crocs.jpg',
        type:'shoes',
        desc:'+10 likelihood to ask to speak to a manager'
    }, {
        key: 5,
        id : 5,
        name: 'struggle sandals',
        price: 15,
        picture: '/imgs/sandals.jpg',
        type:'shoes',
        desc:'dads choice of sunday footwear'                    
    }, {
        key: 6,
        id : 6,
        name: 'hypebeast hi-tops',
        price: 90,
        picture: '/imgs/vans.jpg',
        type:'shoes',
        desc: 'goes well with your off-white sweatpants, thrasher hoodie and addidas hat'
    }]];

// Get the product list
app.get('/products', (req, res) => {
    res.json(database);
})

// Get the items of the shopping cart on the express server
app.get('/shoppingcart', (req, res) => {
    res.json(cart);
})

// Update the shopping cart on the server based on the front end
app.post('/shoppingcart', (req, res) => {
    console.log(req.body);
    let newItem = req.body.newItem;
    cart.push(newItem);
    // ensure that cart is being updated:
    // console.log(cart);
    res.send('item added successfully');
})

// clear user's shopping cart
app.get('/logout', (req, res) => {
    cart = [];
    res.send('reset card in express');
})

app.listen(8080, () => {
    console.log('express server running on 8080');
})


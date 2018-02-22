import React, { Component } from 'react';
import Hats from './Hats';
import Shoes from './Shoes';
import Cart from'./Cart';
import { Route, Switch, Link } from 'react-router-dom';

class Shop extends Component {

    constructor() {
        super();

        this.state = {
            // sample db items
            products : [
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
                }]],
            cart : [],
            keyCounter: 7
        }
    }
    // addToCart takes two arguments - key to uniquely identify which object was clicked,
    //      and itemType to identify in which array the object resides
    // addToCart will mutate the this.state of the Shop component and add an object to
    //      the cart
    addToCart = (key, position) => {
        let productList = this.state.products;
        let cartCopy = Array.from(this.state.cart);
        // find the desired item in the array, and add it to the cart state
        productList[position].map( (element) => {
            if (element.key === key) {
                return cartCopy.push(element);
            }
        })
        this.setState({
            cart : cartCopy
        })
    }

    render() {
        // Allow match to be passed through props from the App.js component
        const {match} = this.props;

        return (
            <div>
                <h1>Shop</h1>
                <nav>
                    <Link to={match.url + '/hats'}>Hats</Link>
                    <Link to={match.url + '/shoes'}>Shoes</Link>
                    <Link to={match.url + '/cart'}>Cart</Link>
                </nav>
                <Switch>
                    {/* Pass additional props to each of these rendered components */}
                    <Route path={match.url + '/hats'} render={(props) => ( <Hats data={this.state.products[0]} addToCart={this.addToCart} {...props} /> )} />
                    <Route path={match.url + '/shoes'} render={ (props) => ( <Shoes data={this.state.products[1]} addToCart={this.addToCart} {...props} /> )} />
                    <Route path={match.url + '/cart'} render={ (props) => ( <Cart data={this.state.cart} {...props} /> )} />
                </Switch>
            </div>
        )
    }
}

export default Shop;
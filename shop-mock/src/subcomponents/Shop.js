import React, { Component } from 'react';
import Hats from './Hats';
import Shoes from './Shoes';
import Cart from'./Cart';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class Shop extends Component {

    constructor() {
        super();
        this.state = {
            products : [[],[]],
            cart : []
        } 
    }

    // addToCart takes two arguments - key to uniquely identify which object was clicked,
    //      and itemType to identify in which array the object resides
    // addToCart will mutate the this.state of the Shop component and add an object to
    //      the cart, and update cart in the express server as well
    addToCart = (key, position) => {
        let productList = this.state.products;
        let cartCopy = Array.from(this.state.cart);
        // find the desired item in the array, and add it to the cart state
        productList[position].map( (element) => {
            if (element.key === key) {
                // push element to first in cart for easy access later on
                return cartCopy.unshift(element);
            }
        })

        // Update express server
        let newItem = cartCopy[0];
        console.log(newItem)
        axios.post('http://localhost:8080/shoppingcart', {
            newItem
        }).then( () => {
            console.log('successful post to server');
        }).catch( (error) => {
            console.log(error);
        })

        this.setState({
            cart : cartCopy
        })
    };
    
    // syncCart makes a get request to the express backend and updates the cart state
    //      with the items from the backend
    syncCart = () => {
        // get request to the api
        axios.get('http://localhost:8080/shoppingcart').then((response)=>{
        // the actual cart data is stored within response.data - we refer to this when we
        //      set state
        console.log(response)
            this.setState({
                cart: response.data
            })
        }).catch((error) => {
            console.log(error);
        })    
    }

    // makes a get request to the express server and retrieves a list of the products
    //      to render
    updateProduct = () => {
        // get request to api
        axios.get('http://localhost:8080/products').then((response) => {
            // update the product state with the response from the express server
            this.setState({
                products:response.data
            })
        }).catch((error) => {
            console.log(error);
        })
    }

    // logs the user out by clearing localStorage and their cart
    logOut = () => {
        axios.get('http://localhost:8080/logout').then(() => {
            console.log('logging out');
            localStorage.clear();
            this.setState ({
                cart:[],
                cartTotal: 0
            })
        }).catch((error) => {
            console.log(error);
        })
    }

    // invoke updateProduct before component mounts
    componentWillMount() {
        this.updateProduct();
    }
    
    // invoke syncCart whenever this component mounts
    componentDidMount() {
        this.syncCart();
    }

    render() {
        // ensure that users cannot access the shop without "logging in" first
        //  checks localStorage to see if user.name is null - if it is, redirect to
        //  Home, else render Shop
        if (null === localStorage.getItem('user')) {
            return ( <Redirect to='/' /> );
        }

        // Allow match to be passed through props from the App.js component
        const {match} = this.props;

        // Styles
        let shopContainer = {
            'paddingLeft': '5vw',
            'paddingTop': '8vh',
            'width':'100vw',
            'height':'auto'
        }

        // let sideNav = {
        //     "height":"100vh",
        //     "paddingTop":"5vh",
        //     "width":"50px",
        //     "backgroundColor":"#eee",
        //     "position":"fixed",
        //     "top":"5vh",
        // }

        let sideNavLink = {
            // "height":"50px",
            // "width":"50px",
            'display': 'block',
            // "backgroundColor" : "#666",
            'marginBottom':"1px"
        }

        let shopTitleContainer = {
            'width': '100%',
            'textAlign':'left',
            'padding' : '2vh 5vw'
        }

        let itemContainer = {
            'width':'75%',
            'margin':'0px 5vw'
        }

        let cartContainer = {
            'marginTop':'20vh',
            'height':'100%'
        }
        return (
            <div style={shopContainer}>
             <div className='row'>
                <nav className = 'col-s-2 h-100'>
                <p className='text-muted' >{'Welcome ' + this.props.username}</p>
                    <h3 className='text-muted'>Shop</h3>
                    <Link style={sideNavLink} to={match.url + '/hats'}>Hats</Link>
                    <Link style={sideNavLink} to={match.url + '/shoes'}>Shoes</Link>

                    <div style={cartContainer}>
                        <Cart data={this.state.cart} cartTotal={this.state.cartTotal} />
                        <button onClick={this.logOut}>Log out</button>
                    </div>
                </nav>
                <div className='container'>
                    <div className='col-s-8'>
                    <Switch>
                        {/* Pass additional props to each of these rendered components */}
                        
                            <Route path={match.url + '/hats'} render={(props) => ( <Hats data={this.state.products[0]} addToCart={this.addToCart} {...props} /> )} />
                            <Route path={match.url + '/shoes'} render={ (props) => ( <Shoes data={this.state.products[1]} addToCart={this.addToCart} {...props} /> )} />
                        
                    </Switch>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default Shop;
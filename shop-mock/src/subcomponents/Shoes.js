import React, { Component } from 'react';

class Shoes extends Component {
    render() {
        // save the addToCart method to a variable
        let addToCart = this.props.addToCart;
        // get the array of shoes passed as a prop form shop
        let shoes = this.props.data;
        // jsx-ify the array
        let shoesJSX = shoes.map( (element) => {
            return (
                <div key={element.key}>
                    <h3>{element.name}</h3>
                    <img src={element.picture} alt=""/>
                    <p> {element.desc} </p>
                    <p> {element.price} </p>
                    <button onClick={() => { addToCart(element.key, 1) }}>Add to Cart</button>
                </div>
            )
        })
        return(
            <div>
                <h1>Shoes</h1>
                {/* Render new list of JSX shoes: */}
                {shoesJSX}
            </div>
        )
    }
}

export default Shoes;
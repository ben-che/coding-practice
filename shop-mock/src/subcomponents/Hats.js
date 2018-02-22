import React, { Component } from 'react';

class Hats extends Component {
    render() {
        // collect the addToCart method
        let addToCart = this.props.addToCart;
        // collect the array of hats
        let hats = this.props.data;
        // turn hats into renderable jsx
        let hatsJSX = hats.map( (element) => {
            return (
                <div key={element.key}>
                    <h3> {element.name} </h3>
                    <img src={element.picture} alt=""/>
                    <p> {element.desc} </p>
                    <p> {element.price} </p>
                    <button onClick={() => {addToCart(element.key, 0)}}>Add to Cart</button>
                </div>
            )
        })
        
        return(
            <div>
               {/* { console.log(hatsJSX)} */}
            <h1>Hats</h1>
            {/* Render new list of JSX hats: */}
            {hatsJSX}
            </div>
        )
    }
}

export default Hats;
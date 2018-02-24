import React, { Component } from 'react';

class Hats extends Component {
    render() {
        // Styles
        let productContainer ={
            'boxShadow':'1px 1px 2px 2px #eee',
            'backgroundColor':'#fff',
            'padding':'30px',
            'margin': '30px'
        }
        let imgContainer = {
        'height':'230px',
        'width':'auto'
        }

        // collect the addToCart method
        let addToCart = this.props.addToCart;
        // collect the array of hats
        let hats = this.props.data;
        // turn hats into renderable jsx
        let hatsJSX = hats.map( (element) => {
            return (
                <div className='col-xs-5 col-s-5 col-md-3 col-lg-3' style={productContainer} key={element.key}>
                    <h4> {element.name} </h4>
                    <div style={imgContainer}>
                    <img src={element.picture} className='img-fluid' alt=""/>
                    </div>
                    <p> {element.desc} </p>
                    <p> {element.price} </p>
                    <button onClick={() => {addToCart(element.key, 0)}}>Add to Cart</button>
                </div>
            )
        })
        
        return(
            <div classname='container'>
               {/* { console.log(hatsJSX)} */}
            <h1>Hats</h1>
            <div className='row'>
            {/* Render new list of JSX hats: */}
            {hatsJSX}
            </div>
            </div>
        )
    }
}

export default Hats;
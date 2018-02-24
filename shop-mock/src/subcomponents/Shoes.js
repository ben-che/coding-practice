import React, { Component } from 'react';

class Shoes extends Component {
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

        // save the addToCart method to a variable
        let addToCart = this.props.addToCart;
        // get the array of shoes passed as a prop form shop
        let shoes = this.props.data;
        // jsx-ify the array
        let shoesJSX = shoes.map( (element) => {
            return (
                <div className='col-xs-5 col-s-5 col-md-3 col-lg-3' style={productContainer} key={element.key}>
                    <h4>{element.name}</h4>
                    <div style={imgContainer}>
                    <img src={element.picture} className='img-fluid' alt=""/>
                    </div>
                    <p> {element.desc} </p>
                    <p> {element.price} </p>
                    <button onClick={() => { addToCart(element.key, 1) }}>Add to Cart</button>
                </div>
            )
        })

      
        return(
            <div className='container'>
                <p className='text-muted text-left'>shoes</p>
                <div className='row'>
                    {/* Render new list of JSX shoes: */}
                    {shoesJSX}
                </div>
            </div>
        )
    }
}

export default Shoes;
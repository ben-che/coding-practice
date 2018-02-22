import React, {Component} from 'react';

class Cart extends Component {
    render() {
        let cart = this.props.data;
        let cartJSX = cart.map( (element) => {
            return (
                <div key={element.key}>
                    <h3> {element.name} </h3>
                    <img src={element.picture} alt=""/>
                    <p> {element.desc} </p>
                    <p> {element.price} </p>
                </div>
            )
        })
        
        return (
            <div>
                {/* {console.log(cart)} */}
            {/* {console.log(cartJSX)} */}
                <h1>Your Cart</h1>
                {cartJSX}
            </div>
        )
    }
}

export default Cart;
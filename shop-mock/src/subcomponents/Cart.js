import React, {Component} from 'react';

class Cart extends Component {
    render() {
        // accept the props from shop and save it in cart
        let cart = this.props.data;
        // map through elements of cart and change them into a format that
        //      is renderable by react
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

        // update total cost of items before rendering the component
        let totalCost = 0;

        // ensure .reduce does not throw an error by feeding it an empty array
        if (this.props.data.length > 0) {
            // use reduce and add the cost of all the items in the cart and save it in the
            //      accumulator 'total'
            let answer = this.props.data.reduce( (total, element) => {
                return total += element.price;
            }, 0)
        // update total cost to the output of the reduce function
        totalCost = answer;
        }

        return (
            <div>
                {/* {console.log(cart)} */}
            {/* {console.log(cartJSX)} */}
                <h1>Your Cart</h1>
                <p>Total Cost: {totalCost}</p>
                {cartJSX}
            </div>
        )
    }
}

export default Cart;
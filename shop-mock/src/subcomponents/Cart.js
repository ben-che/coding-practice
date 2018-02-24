import React, {Component} from 'react';

class Cart extends Component {
    render() {
        // accept the props from shop and save it in cart
        let cart = this.props.data;
        // map through elements of cart and change them into a format that
        //      is renderable by react
        let cartJSX = cart.map( (element) => {
            return (
                <div className='row' key={element.key}>
                    <p className='text-left'> {element.name} </p>
                    {/* <img src={element.picture} alt=""/> */}
                    {/* <p> {element.desc} </p> */}
                    <p>. - $</p>
                    <p className='text-right'> {element.price} </p>
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
                <h3 className='text-muted'>Your Cart</h3>
                <p>Total Cost: {totalCost}</p>
                {cartJSX}
            </div>
        )
    }
}

export default Cart;
import React from 'react'
import {connect} from 'react-redux'
import ConnectedCartTile from '../components/CartTile'
import {fetchCart} from '../store/cart'
import {Link} from 'react-router-dom'

class Cart extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
  }
  render() {
    if (this.props.cartItems.length > 0) {
      return (
        <div>
          <h1>Your Shopping Cart</h1>
          <div className="total">
            <h3>Total: $$$$</h3>
            <Link to="/checkout">Proceed to Checkout</Link>
          </div>
          <ConnectedCartTile cartItems={this.props.cartItems} />
          <div className="total">
            <h3>Total: $$$$</h3>
            <Link to="/checkout">Proceed to Checkout</Link>
          </div>
        </div>
      )
    } else {
      return (
        <div id="empty-cart">
          <h1>Your cart is empty... </h1>
          <img src="/sad-flower.png"></img>
        </div>
      )
    }
  }
}

const stateProps = state => ({
  cartItems: state.cart.products,
  user: state.user
})

const dispatchProps = dispatch => ({
  fetchCart: () => dispatch(fetchCart())
})

const ConnectedCart = connect(stateProps, dispatchProps)(Cart)

export default ConnectedCart

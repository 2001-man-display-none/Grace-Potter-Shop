import React from 'react'
import {connect} from 'react-redux'
import CartTile from '../components/CartTile'
import {fetchCart} from '../store/cart'
import {Link} from 'react-router-dom'

class Cart extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
  }
  total() {
    return this.props.cartItems
      .map(item => item.price * item.order_item.quantity)
      .reduce((x, y) => x + y)
  }

  render() {
    if (this.props.cartItems.length > 0) {
      return (
        <div className="page cart-page">
          <h1>Your Shopping Cart</h1>
          {/* <div className="cart-header">
            <h3>Total: $ {this.total().toFixed(2)}</h3>
            <Link to="/checkout">Proceed to Checkout</Link>
          </div> */}
          <div id="cart">
            {this.props.cartItems.map(item => (
              <CartTile key={item.id} item={item} />
            ))}
          </div>
          <div className="cart-footer">
            <div className="cart-row-left"></div>
            <div className="cart-row-mid">
              <div className="cart-total">
                Total: ${this.total().toFixed(2)}
              </div>
            </div>
            <div className="cart-row-right">
              <Link
                className="pure-button button-primary button-xlarge"
                to="/checkout"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div id="empty-cart">
          <h1>Your cart is empty... </h1>
          <img src="/images/sad-flower.png"></img>
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

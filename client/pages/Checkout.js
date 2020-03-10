import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCart, checkout} from '../store/cart'
import CartTile from '../components/CartTile'

class Checkout extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
  }

  total(cartItems) {
    return cartItems
      .map(item => item.price * item.order_item.quantity)
      .reduce((currTotal, itemTotal) => {
        return currTotal + itemTotal
      }, 0)
      .toFixed(2)
  }

  render() {
    const {cartItems} = this.props

    return (
      <div>
        <h1>Please Confirm Your Order</h1>
        <div className="total">
          <Link to="/cart">Return to cart</Link>
          <h3>Total: $ {this.total(cartItems)}</h3>
          <button
            type="button"
            onClick={() => {
              this.props.checkout()
            }}
          >
            Confirm Order
          </button>
        </div>
        <div id="cart">
          {cartItems.map(item => (
            <CartTile key={item.id} item={item} status={false} />
          ))}
        </div>
        <div className="total">
          <Link to="/cart">Return to cart</Link>
          <h3>Total: $ {this.total(cartItems)}</h3>
          <button
            type="button"
            onClick={() => {
              this.props.checkout()
            }}
          >
            Confirm Order
          </button>
        </div>
      </div>
    )
  }
}

const stateProps = state => ({
  user: state.user,
  cartItems: state.cart.products
})

const dispatchProps = dispatch => ({
  fetchCart: () => dispatch(fetchCart()),
  checkout: id => dispatch(checkout(id))
})

const ConnectedCheckout = connect(stateProps, dispatchProps)(Checkout)

export default ConnectedCheckout

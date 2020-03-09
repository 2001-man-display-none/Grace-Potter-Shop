import React from 'react'
import {connect} from 'react-redux'
import {fetchCart, checkout} from '../store/cart'
import {Link} from 'react-router-dom'
import ItemInfo from '../components/ItemInfo'

class Checkout extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
  }

  total(cartItems) {
    return cartItems
      .map(item => item.price * item.order_item.quantity)
      .reduce((currPrice, newPrice) => {
        return currPrice + newPrice
      }, 0)
      .toFixed(2)
  }

  render() {
    let cart = this.props.cartItems

    return (
      <div>
        <h1>Please Confirm Your Order</h1>
        <div className="total">
          <Link to="/cart">Return to cart</Link>
          <h3>Total: $ {this.total(cart)}</h3>
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
          {cart.map(item => (
            <ItemInfo key={item.id} item={item} />
          ))}
        </div>
        <div className="total">
          <Link to="/cart">Return to cart</Link>
          <h3>Total: $ {this.total(cart)}</h3>
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

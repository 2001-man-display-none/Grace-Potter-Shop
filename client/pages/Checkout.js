import React from 'react'
import {connect} from 'react-redux'
import {fetchCart, checkout} from '../store/cart'
import {Link} from 'react-router-dom'
import CartTile from '../components/CartTile'

class Checkout extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
  }

  total() {
    return this.props.cartItems
      .map(item => item.price * item.order_item.quantity)
      .reduce((currTotal, itemTotal) => {
        return currTotal + itemTotal
      }, 0)
      .toFixed(2)
  }

  render() {
    const {cartItems} = this.props

    return (
      <div className="page checkout-page">
        <h1>Please Confirm Your Order</h1>
        {/* <div className="total">
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
        </div> */}
        <div id="cart">
          {cartItems.map(item => (
            <CartTile key={item.id} item={item} status={false} />
          ))}
        </div>
        <div className="cart-footer">
          <div className="cart-row-left">
            <Link to="/cart" className="pure-button button-large">
              Back
            </Link>
          </div>
          <div className="cart-row-mid">
            <div className="cart-total">Total: ${this.total()}</div>
          </div>
          <div className="cart-row-right">
            <button
              className="pure-button button-primary button-xlarge"
              type="button"
              onClick={() => {
                this.props.checkout()
              }}
            >
              Confirm Order
            </button>
          </div>
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

import React from 'react'
import {connect} from 'react-redux'
import {fetchCart, checkout} from '../store/cart'
import {Link} from 'react-router-dom'
import ConnectedCheckoutTile from '../components/CheckoutTile'

class Checkout extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
  }

  total(cartItems) {
    return cartItems
      .map(item => item.price * item.order_item.quantity)
      .reduce((x, y) => {
        return x + y
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
        <ConnectedCheckoutTile cartItems={this.props.cartItems} />
        <div className="total">
          <Link to="/cart">Return to cart</Link>
          <h3>Total: $ {this.total(cart)}</h3>
          <button type="button" onClick={() => {}}>
            Confirm Order
          </button>
          {/* <Link to="/confirmation" onClick={()=> {}}>Confirm Order</Link> */}
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

import React from 'react'
import {connect} from 'react-redux'
import {fetchCart, updateState} from '../store/cart'
import {Link} from 'react-router-dom'
import ConnectedCheckoutTile from '../components/CheckoutTile'

class Checkout extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
  }
  render() {
    return (
      <div>
        <h1>Please Confirm Your Order</h1>
        <div className="total">
          <Link to="/cart">Return to cart</Link>
          <h3>Total: $$$$</h3>
          <button
            type="button"
            onClick={() => {
              this.props.updateState(this.props.user.id)
            }}
          >
            Confirm Order
          </button>
        </div>
        <ConnectedCheckoutTile cartItems={this.props.cartItems} />
        <div className="total">
          <Link to="/cart">Return to cart</Link>
          <h3>Total: $$$$</h3>
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
  updateState: id => dispatch(updateState(id))
})

const ConnectedCheckout = connect(stateProps, dispatchProps)(Checkout)

export default ConnectedCheckout

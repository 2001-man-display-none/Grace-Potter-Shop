import React from 'react'
import {connect} from 'react-redux'
import ConnectedCartTile from '../components/CartTile'
import {fetchCart} from '../store/cart'

class Cart extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
  }
  render() {
    return (
      <div>
        <h1>Your Shopping Cart</h1>
        <ConnectedCartTile cartItems={this.props.cartItems} />
      </div>
    )
  }
}

const stateProps = state => ({
  cartItems: state.cart.products
})

const dispatchProps = dispatch => ({
  fetchCart: () => dispatch(fetchCart())
})

const ConnectedCart = connect(stateProps, dispatchProps)(Cart)

export default ConnectedCart

import React from 'react'
import {connect} from 'react-redux'
import CartTile from '../components/CartTile'

const Cart = props => {
  console.log(props)
  return (
    <div>
      <p>Grace Potter</p>
      {/* <CartTile props={props.cartItems} /> */}
    </div>
  )
}

const stateProps = state => ({
  cartItems: state.cart.products
})

const ConnectedCart = connect(stateProps)(Cart)

export default ConnectedCart

import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {deleteItemThunk} from '../store/cart'

//make into class to keep subtotal as local state

const CheckoutTile = props => {
  return (
    <div>
      <div id="cart">
        {props.cartItems.map(item => (
          <div key={item.id} id="cart-tile">
            <div>
              <Link to={`/items/${item.id}`}>
                <img src={item.image} width="200" height="200" />
              </Link>
            </div>
            <div>
              <Link to={`/items/${item.id}`}>
                <h3>{item.name}</h3>
              </Link>
            </div>
            <div>
              <div>
                <span>Quantity: #{item.order_item.quantity} </span>
              </div>
              <div id="cart-price">
                <p>
                  Subtotal: $
                  {(item.price * item.order_item.quantity).toFixed(2)}{' '}
                </p>
              </div>
              <div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const mapDispatch = dispatch => ({
  deleteItem: id => dispatch(deleteItemThunk(id))
})

const ConnectedCheckoutTile = connect(null, mapDispatch)(CheckoutTile)

export default ConnectedCheckoutTile

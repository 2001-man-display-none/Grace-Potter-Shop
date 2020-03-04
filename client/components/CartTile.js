import React from 'react'
import {Link} from 'react-router-dom'

//make into class to keep subtotal as local state

const CartTile = props => {
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
                <h2>{item.name}</h2>
              </Link>
              {/* <p>{item.description}</p> */}
              <p>${item.price}</p>
            </div>
            <div>
              <div>
                <span>Quantity: # {item.quantity}</span>
              </div>
              <div>
                <button type="button">+</button>
                <button type="button">-</button>
              </div>
              <div id="cart-price">
                <p>Total:</p>
                <p>${item.price * 2}</p>
              </div>
              <div>
                <button type="button">Remove item from cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div id="subtotal">
        <h3>Subtotal</h3>
        <h3>$$$$</h3>
      </div>
    </div>
  )
}

export default CartTile

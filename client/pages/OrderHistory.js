import React from 'react'
import CartTile from '../components/CartTile'

const OrderHistory = props => {
  return (
    <div>
      <h2>Order #{props.order.id}:</h2>
      <div id="cart">
        {props.products.map(item => (
          <CartTile key={item.id} item={item} showControls={false} />
        ))}
      </div>
    </div>
  )
}

export default OrderHistory

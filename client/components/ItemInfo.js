import React from 'react'
import {Link} from 'react-router-dom'

const ItemInfo = props => {
  let {item} = props
  return (
    <div>
      <div>
        <Link to={`/products/${item.id}`}>
          <img src={item.image} width="200" height="200" />
        </Link>
      </div>
      <div>
        <Link to={`/products/${item.id}`}>
          <h2>{item.name}</h2>
        </Link>
        <p>${item.price}</p>
      </div>
      <div>
        <span>Quantity: {item.order_item.quantity}</span>
      </div>
    </div>
  )
}

export default ItemInfo

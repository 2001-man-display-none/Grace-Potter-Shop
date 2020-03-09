import React from 'react'
import {Link} from 'react-router-dom'

const ProductTile = props => {
  let {product} = props
  return (
    <div key={product.id} className="product-card">
      <Link to={`/products/${product.id}`}>
        <img src={product.image} />
        <h2>{product.name}</h2>
      </Link>
      <p className="price">${product.price}</p>
    </div>
  )
}

export default ProductTile

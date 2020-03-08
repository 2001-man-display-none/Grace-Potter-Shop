import React from 'react'
import {Link} from 'react-router-dom'

const ProductTile = props => {
  const {product} = props
  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`}>
        <img src={product.image} />
      </Link>
      <div className="price">${product.price}</div>
      <Link className="product-link" to={`/products/${product.id}`}>
        {product.name}
      </Link>
    </div>
  )
}

export default ProductTile

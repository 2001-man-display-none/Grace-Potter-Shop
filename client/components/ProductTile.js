import React from 'react'
import {Link} from 'react-router-dom'

const ProductTile = props => {
  const {product} = props
  return (
    <div className="card card-hover product-card">
      <Link to={`/products/${product.id}`}>
        <img src={product.image} />
      </Link>
      <Link className="product-card-body" to={`/products/${product.id}`}>
        <div className="price">${product.price}</div>
        <div className="product-link">{product.name}</div>
      </Link>
    </div>
  )
}

export default ProductTile

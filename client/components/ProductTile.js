import React from 'react'
import {Link} from 'react-router-dom'

const ProductTile = props => {
  return (
    <div className="product-list">
      {props.products.map(product => (
        <div key={product.id} className="product-card">
          <Link to={`/products/${product.id}`}>
            <img src={product.image} />
            <h2>{product.name}</h2>
          </Link>
          <p className="price">${product.price}</p>
        </div>
      ))}
    </div>
  )
}

export default ProductTile

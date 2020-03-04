import React from 'react'
import {Link} from 'react-router-dom'

const ProductTile = props => {
  return (
    <div>
      {props.products.map(product => (
        <div key={product.id}>
          <Link to={`/products/${product.id}`}>
            {' '}
            <img src={product.image} width="200" height="200" />
          </Link>
          <Link to={`/products/${product.id}`}>
            {' '}
            <h2>{product.name}</h2>
          </Link>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  )
}

export default ProductTile

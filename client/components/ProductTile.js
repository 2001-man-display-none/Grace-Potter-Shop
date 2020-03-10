import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {addToCart} from '../store/cart'

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
      <div>
        <button
          id={product.id}
          type="button"
          className="button"
          onClick={() => props.addToCart(product.id)}
        >
          Add To Cart
        </button>
      </div>
    </div>
  )
}

const mapDispatch = dispatch => ({
  addToCart: productId => dispatch(addToCart(productId))
})

const ConnectedProductTile = connect(null, mapDispatch)(ProductTile)

export default ConnectedProductTile

import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {addToCart} from '../store/cart'

const ProductTile = props => {
  const {product} = props
  const toProduct = `/products/${product.id}`

  return (
    <div className="card card-hover product-card">
      <div className="product-card-image">
        <div className="product-card-overlay">
          <button
            id={product.id}
            type="button"
            className="pure-button product-card-button button-small"
            onClick={() => props.addToCart(product.id)}
          >
            Add To Cart
          </button>
        </div>
        <Link to={toProduct}>
          <img src={product.image} />
        </Link>
      </div>
      <div className="product-card-body">
        <Link to={toProduct} className="price">
          ${product.price}
        </Link>
        <Link to={toProduct} className="product-link">
          {product.name}
        </Link>
      </div>
    </div>
  )
}

const mapDispatch = dispatch => ({
  addToCart: productId => dispatch(addToCart(productId))
})

const ConnectedProductTile = connect(null, mapDispatch)(ProductTile)

export default ConnectedProductTile

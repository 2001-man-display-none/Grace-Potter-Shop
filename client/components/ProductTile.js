import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {addToCart} from '../store/cart'

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
          <button
            id={product.id}
            type="button"
            className="button"
            onClick={() => props.addToCart(product.id)}
          >
            Add To Cart
          </button>
        </div>
      ))}
    </div>
  )
}

const mapDispatch = dispatch => ({
  addToCart: productId => dispatch(addToCart(productId))
})

const ConnectedProductTile = connect(null, mapDispatch)(ProductTile)

export default ConnectedProductTile

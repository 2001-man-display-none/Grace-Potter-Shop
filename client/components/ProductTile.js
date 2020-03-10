import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {addToCart} from '../store/cart'
import AddToCartButton from '../components/AddToCartButton'

class ProductTile extends React.Component {
  constructor() {
    super()
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  handleAddToCart(event) {
    event.preventDefault()
    let productId = event.target.id
    this.props.addToCart(productId, 1)
  }

  render() {
    const {product} = this.props
    const toProduct = `/products/${product.id}`

    return (
      <div className="card card-hover product-card">
        <div className="product-card-image">
          <div className="product-card-overlay">
            <AddToCartButton
              productId={product.id}
              className="pure-button product-card-button button-small"
              singleProduct={product.name}
              handleAddToCart={this.handleAddToCart}
            />
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
}

const mapDispatch = dispatch => ({
  addToCart: productId => dispatch(addToCart(productId))
})

const ConnectedProductTile = connect(null, mapDispatch)(ProductTile)

export default ConnectedProductTile

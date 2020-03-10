import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {ToastProvider} from 'react-toast-notifications'
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
    this.props.addToCartDispatch(productId)
  }

  render() {
    const {product} = this.props
    return (
      <div className="product-card">
        <Link to={`/products/${product.id}`}>
          <img src={product.image} />
        </Link>
        <Link className="product-card-body" to={`/products/${product.id}`}>
          <div className="price">${product.price}</div>
          <div className="product-link">{product.name}</div>
        </Link>
        <ToastProvider placement="top-right">
          <AddToCartButton
            className="addtocartButton"
            productId={product.id}
            singleProduct={product.name}
            handleAddToCart={this.handleAddToCart}
          />
        </ToastProvider>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  addToCartDispatch: productId => dispatch(addToCart(productId))
})

const ConnectedProductTile = connect(null, mapDispatch)(ProductTile)

export default ConnectedProductTile

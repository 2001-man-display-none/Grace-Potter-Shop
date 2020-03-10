import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import {addToCart} from '../store/cart'
import ConfirmationPopup from '../components/ConfirmationPopup'
import QuantityDropdown from '../components/QuantityDropdown'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {showPopup: false, quantity: 1}
    this.handleQtyChange = this.handleQtyChange.bind(this)
    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.toggleConfirmationPopup = this.toggleConfirmationPopup.bind(this)
  }

  componentDidMount() {
    let productId = this.props.productId
    this.props.fetchSingleProductDispatch(productId)
  }

  handleAddToCart(event) {
    event.preventDefault()
    let productId = event.target.id
    this.props.addToCartDispatch(productId, this.state.quantity)
    this.toggleConfirmationPopup()
  }

  toggleConfirmationPopup() {
    this.setState({
      showPopup: !this.state.showPopup
    })
  }

  handleQtyChange(value) {
    this.setState({
      quantity: +value
    })
  }

  render() {
    let singleProduct = this.props.singleProduct
    let productId = this.props.productId
    return (
      <div className="page-wide single-product-page">
        <div className="cart-toast">
          {this.state.showPopup ? (
            <ConfirmationPopup
              closePopup={this.toggleConfirmationPopup}
              singleProduct={singleProduct.name}
            />
          ) : null}
        </div>
        <div className="single-product-image">
          <img src={singleProduct.image} width="200" height="200" />
        </div>
        <div className="single-product-main">
          <h1>{singleProduct.name}</h1>
          <h3>${singleProduct.price}</h3>
          <p>
            Meet {singleProduct.name}: {singleProduct.description}
          </p>
        </div>
        <div className="single-product-controls">
          <div className="card">
            <button
              id={productId}
              type="button"
              className="pure-button button-primary button-large"
              onClick={this.handleAddToCart}
            >
              Add To Cart
            </button>
            <QuantityDropdown handleQtyChange={this.handleQtyChange} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    singleProduct: state.singleProduct,
    productId: ownProps.match.params.productId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleProductDispatch: productId =>
      dispatch(fetchSingleProduct(productId)),
    addToCartDispatch: (productId, updatedProduct) =>
      dispatch(addToCart(productId, updatedProduct))
  }
}

const SingleProductConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleProduct)
export default SingleProductConnect

import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import {updateQty, addToCart} from '../store/cart'
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
    // this.props.updateQtyDispatch(productId, {quantity: this.state.quantity})
    this.props.addToCartDispatch(productId, {quantity: this.state.quantity})
    this.toggleConfirmationPopup()
  }

  toggleConfirmationPopup() {
    this.setState({
      showPopup: !this.state.showPopup
    })
  }

  handleQtyChange(value) {
    this.setState({
      [event.target.name]: value
    })
    console.log(this.state)
  }

  render() {
    let singleProduct = this.props.singleProduct
    let productId = this.props.productId
    console.log('singlepage:', this.state)
    return (
      <div>
        <h2>{singleProduct.name}</h2>
        <img src={singleProduct.image} width="200" height="200" />
        <p>
          Meet {singleProduct.name}: {singleProduct.description}
        </p>
        <h3>${singleProduct.price}</h3>
        <QuantityDropdown handleQtyChange={this.handleQtyChange} />
        <div>
          <button
            id={productId}
            type="button"
            className="button"
            onClick={this.handleAddToCart}
          >
            Add To Cart
          </button>
          <div>
            {this.state.showPopup ? (
              <ConfirmationPopup
                closePopup={this.toggleConfirmationPopup}
                singleProduct={singleProduct.name}
              />
            ) : null}
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
      dispatch(addToCart(productId, updatedProduct)),
    updateQtyDispatch: (productId, newProduct) =>
      dispatch(updateQty(productId, newProduct))
  }
}

const SingleProductConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleProduct)
export default SingleProductConnect

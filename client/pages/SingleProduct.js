import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import {addToCart} from '../store/cart'
import ConfirmationPopup from '../components/ConfirmationPopup'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {showPopup: false}
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
    this.props.addToCartDispatch(productId)
    this.toggleConfirmationPopup()
  }

  toggleConfirmationPopup() {
    this.setState({
      showPopup: !this.state.showPopup
    })
  }

  render() {
    let singleProduct = this.props.singleProduct
    let productId = this.props.productId

    return (
      <div>
        <h2>{singleProduct.name}</h2>
        <img src={singleProduct.image} width="200" height="200" />
        <p>
          Meet {singleProduct.name}: {singleProduct.description}
        </p>
        <h3>${singleProduct.price}</h3>
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
    addToCartDispatch: productId => dispatch(addToCart(productId))
  }
}

const SingleProductConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleProduct)
export default SingleProductConnect

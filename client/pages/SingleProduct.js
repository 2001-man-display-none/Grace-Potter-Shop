import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {ToastProvider} from 'react-toast-notifications'
import {fetchSingleProduct} from '../store/singleProduct'
import {addToCart} from '../store/cart'
import QuantityDropdown from '../components/QuantityDropdown'
import AddToCartButton from '../components/AddToCartButton'
import '../components/AddToCartButton-style.css'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {quantity: 1}
    this.handleQtyChange = this.handleQtyChange.bind(this)
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  componentDidMount() {
    let productId = this.props.productId
    this.props.fetchSingleProductDispatch(productId)
  }

  handleAddToCart(event) {
    event.preventDefault()
    let productId = event.target.id
    this.props.addToCartDispatch(productId, this.state.quantity)
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
      <div>
        <h2>{singleProduct.name}</h2>
        <img src={singleProduct.image} width="200" height="200" />
        <p>
          Meet {singleProduct.name}: {singleProduct.description}
        </p>
        <h3>${singleProduct.price}</h3>
        <QuantityDropdown handleQtyChange={this.handleQtyChange} />
        <ToastProvider placement="bottom-right">
          <AddToCartButton
            className="addtocartButton"
            productId={productId}
            singleProduct={singleProduct.name}
            handleAddToCart={this.handleAddToCart}
          />
        </ToastProvider>
        <Link to="/products">Back</Link>
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

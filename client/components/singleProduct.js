import React from 'react'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
import {fetchSingleProduct} from '../store/singleProduct'

class SingleProduct extends React.Component {
  componentDidMount() {
    let productId = this.props.productId
    this.props.fetchSingleProductDispatch(productId)
  }

  render() {
    let singleProduct = this.props.singleProduct
    console.log(this.props)
    console.log('this is singleproduct', singleProduct)

    return (
      <div>
        <h2>{singleProduct.name}</h2>
        <img src={singleProduct.image} width="200" height="200" />
        <p>
          Meet {singleProduct.name}: {singleProduct.description}
        </p>
        <h3>${singleProduct.price}</h3>
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
      dispatch(fetchSingleProduct(productId))
  }
}

const singleProductConnect = connect(mapStateToProps, mapDispatchToProps)(
  SingleProduct
)
export default singleProductConnect

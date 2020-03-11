import React from 'react'
import {connect} from 'react-redux'
import {fetchAll} from '../store/products'
import ProductTile from '../components/ProductTile'
import {addToCart} from '../store/cart'

export class ProductList extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    switch (this.props.status) {
      case 'loading':
        return <div>loading...</div>
      case 'error':
        return <div>Couldn't load products. Try again later.</div>
      case 'done':
        return (
          <div className="page products-page">
            <h1>Available Products</h1>
            <div className="product-list">
              {this.props.products.map(product => (
                <ProductTile key={product.id} product={product} />
              ))}
            </div>
          </div>
        )
      default:
        console.error('unknown products status')
    }
  }
}

const stateProps = state => ({
  products: state.products.products,
  status: state.products.status
})

const dispatchProps = dispatch => ({
  fetchProducts: () => dispatch(fetchAll()),
  addToCart: productId => dispatch(addToCart(productId))
})

const ConnectedProductList = connect(stateProps, dispatchProps)(ProductList)

export default ConnectedProductList

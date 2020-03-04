import React from 'react'
import {connect} from 'react-redux'
import {fetchAll} from '../store/products'
import ProductTile from '../components/ProductTile'

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
          <div>
            <h1>Available Products</h1>
            <ProductTile {...this.props} />
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
  fetchProducts: () => dispatch(fetchAll())
})

const ConnectedProductList = connect(stateProps, dispatchProps)(ProductList)

export default ConnectedProductList

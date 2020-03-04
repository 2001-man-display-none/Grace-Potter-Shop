import React from 'react'
import {connect} from 'react-redux'

import {fetchAll} from '../store/products'

export class ProductList extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }
  render() {
    switch (this.props.status) {
      case 'loading':
        return <div>loading...</div>
      case 'error':
        return <div>sadface...</div>
      case 'done':
        return (
          <div>
            <h1>Available Products</h1>
            <div>
              {this.props.products.map(product => (
                <div key={product.id}>product.name</div>
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
  fetchProducts: () => dispatch(fetchAll())
})

const ConnectedProductList = connect(stateProps, dispatchProps)(ProductList)

export default ConnectedProductList

import React from 'react'
import {connect} from 'react-redux'
import {fetchAll} from '../store/products'
import ProductTile from '../components/ProductTile'
import ReactPaginate from 'react-paginate'
import {addToCart} from '../store/cart'

export class ProductList extends React.Component {
  constructor() {
    super()
    this.state = {
      currPage: 1,
      productsPerPage: 12,
      currProducts: [],
      pageCount: 0
    }
    this.handlePageChange = this.handlePageChange.bind(this)
  }
  async componentDidMount() {
    await this.props.fetchProducts(this.state.currPage)

    const state = this.state
    const iOfLastProduct = state.currPage * state.productsPerPage
    const iOfFirstProduct = iOfLastProduct - state.productsPerPage
    this.setState({
      currProducts: this.props.products.slice(iOfFirstProduct, iOfLastProduct),
      pageCount: Math.ceil(this.props.products.length / state.productsPerPage)
    })
  }

  handlePageChange(pageNumber) {
    console.log(pageNumber)
    console.log(typeof pageNumber)
    this.setState({
      currPage: Number(pageNumber)
    })
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
              {this.state.currProducts.map(product => (
                <ProductTile key={product.id} product={product} />
              ))}
            </div>
            <div id="pagination">
              <ReactPaginate
                activePage={this.state.currPage}
                pageCount={this.state.pageCount}
                forcePage={this.state.currPage}
                onPageChange={this.handlePageChange}
              />
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
  fetchProducts: pageNum => dispatch(fetchAll(pageNum)),
  addToCart: productId => dispatch(addToCart(productId))
})

const ConnectedProductList = connect(stateProps, dispatchProps)(ProductList)

export default ConnectedProductList

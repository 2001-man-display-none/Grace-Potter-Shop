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
      currPage: 0,
      pageCount: 0
    }
    this.handlePageChange = this.handlePageChange.bind(this)
  }
  async componentDidMount() {
    await this.props.fetchProducts(this.state.currPage)
    this.setState({
      pageCount: this.props.pageCount
    })
  }

  async handlePageChange(pageNum) {
    await this.props.fetchProducts(pageNum.selected)
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
            <div id="pagination">
              <ReactPaginate
                activePage={this.state.currPage}
                pageCount={this.state.pageCount}
                forcePage={this.state.currPage}
                onPageChange={this.handlePageChange}
                containerClassName="pagination"
                subContainerClassName="pages pagination"
                activeClassName="active"
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
  status: state.products.status,
  pageCount: state.products.pageCount
})

const dispatchProps = dispatch => ({
  fetchProducts: pageNum => dispatch(fetchAll(pageNum)),
  addToCart: productId => dispatch(addToCart(productId))
})

const ConnectedProductList = connect(stateProps, dispatchProps)(ProductList)

export default ConnectedProductList

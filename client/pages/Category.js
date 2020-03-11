import React from 'react'
import {connect} from 'react-redux'
import {selectCategory, fetchSingleCategory} from '../store/categories'
import ProductTile from '../components/ProductTile'
import ReactPaginate from 'react-paginate'

export class CategoryPage extends React.Component {
  constructor() {
    super()
    this.state = {
      currPage: 0,
      pageCount: 0
    }
    this.handlePageChange = this.handlePageChange.bind(this)
  }
  componentDidMount() {
    this.loadFromSlug(this.props.slug)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.slug !== this.props.slug) {
      this.loadFromSlug(this.props.slug)
    }
  }

  loadFromSlug(slug) {
    this.props.selectCategory(slug)
    this.props.fetchCategoryProducts(slug, this.state.currPage)
  }

  async handlePageChange(pageNum) {
    await this.props.fetchProducts(pageNum.selected)
  }

  render() {
    const {category, products, status} = this.props
    switch (status) {
      case 'loading':
        return <div>loading...</div>
      case 'error':
        return <div>Couldn't load products. Try again later.</div>
      case 'done':
        return (
          <div className="page category-page">
            <h1>{category.name}</h1>
            <div className="product-list">
              {products.map(product => (
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

const stateProps = (state, ownProps) => {
  return {
    slug: ownProps.match.params.slug,
    status: state.categories.currentCategory.status,
    category: state.categories.currentCategory.value,
    products: state.categories.currentCategory.value.products,
    pageCount: state.products.pageCount
  }
}

const dispatchProps = dispatch => ({
  fetchCategoryProducts: (category, pageNum) =>
    dispatch(fetchSingleCategory(category, pageNum)),
  selectCategory: category => dispatch(selectCategory(category))
})

const ConnectedCategoryPage = connect(stateProps, dispatchProps)(CategoryPage)

export default ConnectedCategoryPage

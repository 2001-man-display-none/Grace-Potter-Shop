import React from 'react'
import './confirmation-style.css'

class ConfirmationPopup extends React.Component {
  render() {
    return (
      <div className="popup">
        <h3 className="font">
          {this.props.singleProduct.toUpperCase()} has been added to cart!
        </h3>
        <button className="close" type="button" onClick={this.props.closePopup}>
          X
        </button>
      </div>
    )
  }
}

export default ConfirmationPopup

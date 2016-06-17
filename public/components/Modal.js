import React from 'react'

import ReactModal from 'react-modal'
import modalStyles from '../styles/modal.css'
import modalContentStyles from '../styles/modalContent.css'

class TourModal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {show: true}
  }

  render() {
    return (
      <ReactModal isOpen={this.props.show && this.state.show} className={"modal " + this.state.style} overlayClassName="overlay" onAfterOpen={this.transform.bind(this)}>
        <h3>{this.props.title}</h3>
        <div>
          {this.props.children}
          <button onClick={this.hideModal.bind(this)}>Got it!</button>
        </div>
      </ReactModal>
    )
  }

  transform() {
    this.setState({style: 'show'})
  }

  hideModal() {
    this.setState({show: false})
    this.props.onClose()
  }
}

export default TourModal

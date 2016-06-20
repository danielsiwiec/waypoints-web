import React, {Component} from 'react'
import classNames from 'classnames/bind'

import ReactModal from 'react-modal'
import styles from '../styles/modal.css'

let cx = classNames.bind(styles)

export default class TourModal extends Component {

  constructor(props) {
    super(props)
    this.state = {transform: false}
  }

  render() {
    let className = cx({
      modal: true,
      show : this.state.transform
    })

    return (
      <ReactModal isOpen={this.props.show} className={className} overlayClassName={styles.overlay} onAfterOpen={this.transform.bind(this)}>
        {this.props.children}
      </ReactModal>
    )
  }

  transform() {
    this.setState({transform: true})
  }
}

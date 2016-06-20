import React, {Component} from 'react'
import classNames from 'classnames/bind'

import ReactModal from 'react-modal'
import styles from '../styles/modal.css'

let cx = classNames.bind(styles)

export default class TourModal extends Component {

  constructor(props) {
    super(props)
    this.state = {show: true}
  }

  render() {
    let className = cx({
      modal: true,
      show : this.state.transform
    })

    return (
      <ReactModal isOpen={this.props.show && this.state.show} className={className} overlayClassName={styles.overlay} onAfterOpen={this.transform.bind(this)}>
        <h3 className={styles.title}>{this.props.title}</h3>
        <div className={styles.body}>
          {this.props.children}
          <button className={styles.button} onClick={this.hideModal.bind(this)}>Got it!</button>
        </div>
      </ReactModal>
    )
  }

  transform() {
    this.setState({transform: true})
  }

  hideModal() {
    this.setState({show: false})
    this.props.onClose()
  }
}

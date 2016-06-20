import React, {Component} from 'react'

import styles from '../styles/hash.css'

export default class Hash extends Component {
  render() {
    return (<span className={styles.hash}>{this.props.hash}</span>)
  }
}

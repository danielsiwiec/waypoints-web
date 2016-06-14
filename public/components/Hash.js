import React from 'react'

import size from '../styles/size'
import center from '../styles/center'

let styles = Object.assign({}, size, center, {
    color: 'gray'
})

class Hash extends React.Component {
  render() {
    return (<span style={styles}>{this.props.hash}</span>)
  }
}

export default Hash

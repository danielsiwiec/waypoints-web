import React from 'react'
import { render } from 'react-dom'

class Hash extends React.Component {

  spanStyle() {
    return {
      color: 'gray',
      fontSize: '200%',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }
  }

  render() {
    return (<span style={this.spanStyle()}>{this.props.hash}</span>)
  }
}

export default Hash

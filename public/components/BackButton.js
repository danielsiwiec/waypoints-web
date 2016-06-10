import React from 'react'
import { render } from 'react-dom'

import Search from './Search'
import size from '../styles/size'

let styles = Object.assign({}, size, {
	backgroundColor: '#E01111',
	border: '0px solid',
	display: 'inline-block',
	color: '#ffffff',
  marginLeft: '10px'
})

class BackButton extends React.Component {

  render() {
    return <button type="button" style={styles} onClick={this.click.bind(this)}>Back</button>
  }

  click() {
		render(<Search></Search>, document.getElementById('root'))
  }
}

export default BackButton

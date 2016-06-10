import React from 'react'
import { render } from 'react-dom'

import Hash from './Hash'
import size from '../styles/size'

let styles = Object.assign({}, size, {
	backgroundColor: '#11E011',
	border: '0px solid',
	display: 'inline-block',
	color: '#ffffff',
  marginLeft: '10px'
})

class SendButton extends React.Component {

  render() {
    return <button type="button" style={styles} onClick={this.click}>Send</button>
  }

  click() {
    fetch('/locations', {
      method: 'POST',
      body: JSON.stringify(location)
    }).then((response) => {
      return response.json()
    }).then((data) => {
      render(<Hash hash={data.hash}></Hash>, document.getElementById('root'))
    })
  }
}

export default SendButton

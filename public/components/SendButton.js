import React from 'react'
import { render } from 'react-dom'

import Hash from './Hash'

let styles = {
	backgroundColor: '#11E011',
	borderRadius: '3px',
	border: '0px solid',
	display: 'inline-block',
	color: '#ffffff',
	padding: '3px 9px 3px 9px',
  marginLeft: '10px'
}

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

import React from 'react'
import { render } from 'react-dom'

import Hash from './Hash'

class SendButton extends React.Component {

  render() {
    return <button type="button" onClick={this.click}>Send</button>
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

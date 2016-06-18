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

let httpPost = function(url, body, callback) {
	let xmlHttp = new XMLHttpRequest()
	xmlHttp.open('POST', url)
	xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
	xmlHttp.send(JSON.stringify(body))
	xmlHttp.onreadystatechange = () => {
		if (xmlHttp.readyState == 4 && xmlHttp.status >= 200 && xmlHttp.status <= 299)
				callback(JSON.parse(xmlHttp.responseText))
	}
}

let payload = function(place) {
	return {
		name: place.name,
		geo: {
			lat: place.geometry.location.lat(),
			long: place.geometry.location.lng()
		}
	}
}

class SendButton extends React.Component {

  render() {
    return <button type="button" style={styles} onClick={this.click.bind(this)}>Send</button>
  }

  click() {
		httpPost('/locations', payload(this.props.place), (data) => {
			render(<Hash hash={data.hash}></Hash>, document.getElementById('root'))
		})
  }
}

export default SendButton

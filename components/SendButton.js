import React from 'react'
import {Button} from 'material-ui'

export default ({onClick}) => {
	return <Button variant="raised" color="primary" onClick={onClick}>Send</Button>
}
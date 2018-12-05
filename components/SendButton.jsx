import React from 'react'
import { Button } from '@material-ui/core'

export default ({ onClick }) => {
  return <Button variant='contained' color='primary' onClick={onClick}>Send</Button>
}

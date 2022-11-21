import React from 'react'
import { Button } from '@mui/material'

export default ({ onClick }) => {
  return <Button variant='contained' color='primary' onClick={onClick}>Send</Button>
}

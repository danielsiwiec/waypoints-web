import React, {Component} from 'react'
import { render } from 'react-dom'
import {Button} from '@material-ui/core'

import Home from './Home'

export default ({onClick}) => (
  <Button variant="contained" color="secondary" onClick={onClick}>Back</Button>
)

import React, {Component} from 'react'
import { render } from 'react-dom'
import {Button} from 'material-ui'

import Home from './Home'

export default ({onClick}) => (
  <Button variant="raised" color="secondary" onClick={onClick}>Back</Button>
)

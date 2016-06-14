import React from 'react'
import { render } from 'react-dom'

import Home from './components/Home'

window.init = () => {
  render(<Home></Home>, document.getElementById('root'))
}

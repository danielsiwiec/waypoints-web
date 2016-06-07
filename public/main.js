import React from 'react'
import { render } from 'react-dom'

import Search from './components/Search'

window.init = () => {
  render(<Search></Search>, document.getElementById('root'))
}

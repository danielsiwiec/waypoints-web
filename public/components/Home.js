import React, {Component} from 'react'

import Search from './Search'
import NewFeatures from './NewFeatures'

export default class Home extends Component {

  render() {
    return(
      <div>
        <Search />
        <NewFeatures />
      </div>
    )
  }
}

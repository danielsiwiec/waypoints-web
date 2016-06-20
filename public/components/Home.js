import React, {Component} from 'react'

import Search from './Search'
import NewFeatures from './NewFeatures'
import notes from '../Notes.json'

export default class Home extends Component {

  render() {
    return(
      <div>
        <Search />
        <NewFeatures notes={notes}/>
      </div>
    )
  }
}

import React, {Component} from 'react'

import Search from './Search'
import NewFeatures from 'react-new-features-modal'
import notes from '../Notes.json'

export default class Home extends Component {

  render() {
    return(
      <div>
        <Search />
        <NewFeatures notes={notes} storageKey="sendpointsVersion"/>
      </div>
    )
  }
}

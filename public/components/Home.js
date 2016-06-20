import React from 'react'

import Search from './Search'
import NewFeatures from './NewFeatures'

class Home extends React.Component {

  render() {
    return(
      <div>
        <Search />
        <NewFeatures />
      </div>
    )
  }
}

export default Home

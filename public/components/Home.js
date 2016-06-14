import React from 'react'

import Search from './Search'
import Tour from './Tour'

class Home extends React.Component {

  render() {
    return(
      <div>
        <Search />
        <Tour />
      </div>
    )
  }
}

export default Home

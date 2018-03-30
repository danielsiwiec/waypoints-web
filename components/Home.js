import React, {Component} from 'react'
import {Grid} from 'material-ui'

import Search from './Search'
import ViewPlace from './ViewPlace'
import Hash from './Hash'
import BackButton from './BackButton'
import {post} from '../utils/fetch'
// import NewFeatures from 'react-new-features-modal'
// import notes from './Notes.json'

const states = {
  SEARCH: 1,
  VIEW: 2,
  HASH: 3
}

export default class Home extends Component {

  constructor() {
    super()
    this.state = {state: states.SEARCH}
    this.onSetPlace = this.onSetPlace.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
    this.onBack = this.onBack.bind(this)
    this.onSend = this.onSend.bind(this)
  }
  
  render() {
    return(
      <Grid container
          alignItems='center'
          justify='center'
          style={{height: '100vh'}}
        >
        <Grid item>
          {this.state.state === states.SEARCH && <Search onSetPlace={this.onSetPlace}/>}
          {this.state.state === states.VIEW && <ViewPlace place={this.state.place} onDragEnd={this.onDragEnd} onNameChange={this.onNameChange} onSend={this.onSend} />}
          {this.state.state === states.HASH && <Hash hash={this.state.hash} /> }
          {this.state.state !== states.SEARCH && <BackButton onClick={this.onBack}/> }
        </Grid>
      </Grid>
    )
  }

  onSetPlace(googlePlace) {
    let place = {
      name: googlePlace.name,
      geo: {
        lat: googlePlace.geometry.location.lat(),
        lng: googlePlace.geometry.location.lng(),
      }
    }
    this.setState({place})
    this.setState({state: states.VIEW})
  }

  onDragEnd(marker) {
    let place = this.state.place
    place.geo = {
      lat: marker.latLng.lat(),
      long: marker.latLng.lng()
    }
    this.setState({place})
  }

  onNameChange(event) {
    let place = this.state.place
    place.name = event.target.value
    this.setState({place})
  }

  onBack() {
    this.setState({place: undefined})
    this.setState({state: states.SEARCH})
  }

  onSend() {
    post('/locations', this.state.place).then(({hash}) => {
      this.setState({hash})
      this.setState({state: states.HASH})
    })
  }
}
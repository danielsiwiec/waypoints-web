import React, {Component} from 'react'
import {Grid} from 'material-ui'

import Search from './Search'
import Map from './Map'
import SendButton from './SendButton'
import BackButton from './BackButton'
import Hash from './Hash'
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
    this.onBack = this.onBack.bind(this)
    this.onSend = this.onSend.bind(this)
  }
  
  render() {
    return(
      <div className='container'>
        <Grid container justify='center'>
          <Grid item md={4} xs={10}>
            {this.state.state === states.SEARCH && <Search onSetPlace={this.onSetPlace}/>}
            {this.state.state === states.VIEW && <div>
              <Map place={this.state.place} onDragEnd={this.onDragEnd} />
              <SendButton onClick={this.onSend} />
              <BackButton onClick={this.onBack}/>
              {/* add place name edit */}
            </div> }
            {this.state.state === states.HASH && <div>
              <Hash hash={this.state.hash} />
              <BackButton onClick={this.onBack}/>
            </div> }
          </Grid>
        </Grid>
        <style jsx>{`
          .container {
            margin-top: 30vh;
          }
        `}</style>
      </div>
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

  onBack() {
    this.setState({state: states.SEARCH})
  }

  onSend() {
    post('/locations', this.state.place).then(({hash}) => {
      this.setState({hash})
      this.setState({state: states.HASH})
    })
  }
}
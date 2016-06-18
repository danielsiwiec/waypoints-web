import React from 'react'

import SendButton from './SendButton'
import BackButton from './BackButton'
import size from '../styles/size'
import center from '../styles/center'

let mapStyles = Object.assign({}, size, center, {
  height: '50%',
  width: '50%',
  textAlign: 'center'
})

let mapCanvasStyles = {
  display: 'block',
  width: '100%',
  height: '100%',
  marginBottom: '30px'
}

class Map extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      place: this.props.place
    }
  }

	render() {
    return(
    <div style={mapStyles}>
      <div style={mapCanvasStyles} ref="mapCanvas"></div>
      <div>
        <span>{this.state.place.name}</span>
        <SendButton place={this.state.place}></SendButton>
        <BackButton />
      </div>
    </div>
    )
  }

  componentDidMount() {
    this.map = this.createMap()
    this.marker = this.createMarker()
    this.marker.addListener('dragend', () => {
      this.setState({
        place: Object.assign(this.state.place, {geometry: this.marker.position})})
    })
  }

  createMap() {
    let mapOptions = {
      zoom: 14,
      center: this.mapCenter()
    }
    return new google.maps.Map(this.refs.mapCanvas, mapOptions)
  }

  mapCenter() {
    return this.state.place.geometry.location
  }

  createMarker() {
    return new google.maps.Marker({
      position: this.mapCenter(),
      map: this.map,
      draggable: true,
      crossOnDrag: false
    })
	}
}

export default Map

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

  static propTypes() {
  	marker: React.PropTypes.objectOf(React.PropTypes.number).isRequired
  }

	render() {
    return(
    <div style={mapStyles}>
      <div style={mapCanvasStyles} ref="mapCanvas"></div>
      <div>
        <span>{this.props.place.name}</span>
        <SendButton place={this.props.place}></SendButton>
        <BackButton />
      </div>
    </div>
    )
  }

  componentDidMount() {
    this.map = this.createMap()
    this.marker = this.createMarker()
  }

  createMap() {
    let mapOptions = {
      zoom: 14,
      center: this.mapCenter()
    }
    return new google.maps.Map(this.refs.mapCanvas, mapOptions)
  }

  mapCenter() {
    return new google.maps.LatLng(
      this.props.place.geo.lat,
      this.props.place.geo.long
    )
  }

  createMarker() {
    return new google.maps.Marker({
      position: this.mapCenter(),
      map: this.map
    })
	}
}

export default Map

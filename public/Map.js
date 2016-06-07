import React from 'react'

import SendButton from './SendButton'

class Map extends React.Component {

  static propTypes() {
  	marker: React.PropTypes.objectOf(React.PropTypes.number).isRequired
  }

	render() {
    return(
    <div className="map">
      <div className="mapcanvas" ref="mapCanvas"></div>
      <div>
        <span>{this.props.name}</span>
        <SendButton></SendButton>
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
      this.props.marker.lat,
      this.props.marker.lng
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

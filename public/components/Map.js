import React, {Component} from 'react'

import SendButton from './SendButton'
import BackButton from './BackButton'
import styles from '../styles/map.css'

export default class Map extends Component {

  constructor(props) {
    super(props)
    this.state = {
      place: this.props.place
    }
  }

	render() {
    return(
    <div className={styles.map}>
      <div className={styles.canvas} ref="mapCanvas"></div>
      <div>
        <input className={styles.name} type="text" value={this.state.place.name} onChange={this.handleNameChange.bind(this)}/>
        <br />
        <SendButton place={this.state.place}></SendButton>
        <BackButton />
      </div>
    </div>
    )
  }

  handleNameChange(event) {
    this.setState(
      {
        place: Object.assign(this.state.place, {name: event.target.value})
      }
    )
  }

  componentDidMount() {
    this.map = this.createMap()
    this.marker = this.createMarker()
    this.marker.addListener('dragend', () => {
      this.setState(
        {
          place: Object.assign(this.state.place, {geometry: {location: this.marker.position}})
        }
      )
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

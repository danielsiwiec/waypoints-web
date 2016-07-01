import React, {Component} from 'react'
import { render } from 'react-dom'

import Map from './Map'
import styles from '../styles/search.css'
import coordinates from 'parse-coords'

export default class Search extends Component{

  render() {
    return (
      <input ref='autocomplete' className={ styles.search } type="text" placeholder="Freddie's Sandwiches"></input>
    )
  }

  componentDidMount() {
    var autocomplete = new google.maps.places.Autocomplete(this.refs.autocomplete)
    autocomplete.addListener('place_changed', () => {
      let place = autocomplete.getPlace().geometry ? autocomplete.getPlace() : this.tryCoordinates(this.refs.autocomplete.value)
      render(<Map place={place} />, document.getElementById('root'))
    })
  }

  tryCoordinates(input) {
    let coords = coordinates(input)
    return coords ? {
      name: input,
      geometry: {
        location: new google.maps.LatLng(coords.lat, coords.lng)
      }
    } : null
  }
}

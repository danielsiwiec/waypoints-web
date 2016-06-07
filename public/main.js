import React from 'react'
import { render } from 'react-dom'

import Map from './Map'

class Search extends React.Component{
  render() {
    return (
      <input ref='autocomplete' className="autocomplete glowing-border" type="text"></input>
    )
  }

  componentDidMount() {
    var autocomplete = new google.maps.places.Autocomplete(this.refs.autocomplete)
    autocomplete.addListener('place_changed', () => {
      var place = autocomplete.getPlace()
      let latLng = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      }
      render(<Map marker={latLng} name={place.name} />, document.getElementById('root'))
    })
  }
}

window.init = () => {
  render(<Search></Search>, document.getElementById('root'))
}

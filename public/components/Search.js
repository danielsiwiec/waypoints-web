import React from 'react'
import { render } from 'react-dom'
import Radium from 'radium'

import Map from './Map'

let styles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  border: '2px solid #dadada',
  borderRadius: '3px',
  ':focus': {
    outline: 'none',
    border: '3px solid #9ecaed',
    boxShadow: '0 0 10px #9ecaed'
  }
}

class SearchBase extends React.Component{

  render() {
    return (
      <input ref='autocomplete' style={styles} type="text"></input>
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

const Search = Radium(SearchBase)

export default Search

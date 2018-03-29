import React, {Component} from 'react'
import {Input} from 'material-ui'
import coordinates from 'parse-coords'

const Search = ({onSetPlace}) => {
  return (
    <Input fullWidth={true} inputRef={attachAutocomplete(onSetPlace)} autoFocus={true} placeholder="Freddie's Sandwiches" />
  )
}

function attachAutocomplete(onSetPlace) {
  return element => {
    let autocomplete = new google.maps.places.Autocomplete(element)
    autocomplete.addListener('place_changed', () => {
      let place = autocomplete.getPlace().geometry ? autocomplete.getPlace() : tryCoordinates(autocomplete.getPlace().name)
      onSetPlace(place)
    })
  }
}

function tryCoordinates(input) {
  return {
    name: input,
    location: coordinates(input)
  }
}

export default Search
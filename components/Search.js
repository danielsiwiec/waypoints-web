import React, {Component} from 'react'
import {Input} from 'material-ui'
import coordinates from 'parse-coords'
import {Grid} from 'material-ui'

import Help from './Help'

const Search = ({onSetPlace}) => {
  return (
    <Grid container >
      <Grid item xs={1}>
      </Grid>
      <Grid item xs={10}>
        <Input fullWidth={true} inputRef={attachAutocomplete(onSetPlace)} autoFocus={true} placeholder="Freddie's Sandwiches" />
      </Grid>
      <Grid item xs={1}>
        <Help />
      </Grid>
    </Grid>
  )
}

function attachAutocomplete(onSetPlace) {

  return element => {
    let autocomplete = new google.maps.places.Autocomplete(element)
    autocomplete.addListener('place_changed', () => {
      let place = autocomplete.getPlace().geometry ? normalizeGooglePlace(autocomplete.getPlace()) : tryCoordinates(element.value)
      onSetPlace(place)
    })
  }
}

function tryCoordinates(input) {
  return {
    name: input,
    geo: coordinates(input)
  }
}

const normalizeGooglePlace = googlePlace => ({
  name: googlePlace.name,
  geo: {
    lat: googlePlace.geometry.location.lat(),
    lng: googlePlace.geometry.location.lng(),
  }
})

export default Search
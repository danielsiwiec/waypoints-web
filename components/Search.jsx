import React from 'react'
import { Input, Grid } from '@material-ui/core'
import coordinates from 'parse-coords'

import Help from './Help'

const Search = ({ onSetPlace }) => {
  return (
    <Grid container >
      <Grid item xs={1} />
      <Grid item xs={10}>
        <Input fullWidth inputRef={attachAutocomplete(onSetPlace)} autoFocus placeholder="Freddie's Sandwiches" />
      </Grid>
      <Grid item xs={1}>
        <Help />
      </Grid>
    </Grid>
  )
}

function attachAutocomplete (onSetPlace) {
  return element => {
    let autocomplete = new google.maps.places.Autocomplete(element)
    autocomplete.addListener('place_changed', () => {
      let place = autocomplete.getPlace().geometry ? normalizeGooglePlace(autocomplete.getPlace()) : tryCoordinates(element.value)
      onSetPlace(place)
    })
  }
}

function tryCoordinates (input) {
  return {
    name: input,
    geo: coordinates(input)
  }
}

const normalizeGooglePlace = googlePlace => ({
  name: googlePlace.name,
  geo: {
    lat: googlePlace.geometry.location.lat(),
    lng: googlePlace.geometry.location.lng()
  }
})

export default Search

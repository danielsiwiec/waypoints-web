import React from 'react'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const Map = withGoogleMap(({ place, onDragEnd }) => {
  const defaultProps = {
    zoom: 13
  }
  return (
    <GoogleMap
      defaultZoom={defaultProps.zoom}
      defaultCenter={place.geo}
    >
      <Marker position={place.geo} draggable onDragEnd={onDragEnd} />
    </GoogleMap>
  )
})

export default ({ place, onDragEnd }) => (
  <Map
    place={place}
    onDragEnd={onDragEnd}
    containerElement={<div style={{ height: '60vh', width: '100%' }} />}
    mapElement={<div style={{ height: `100%` }} />}
  />
)

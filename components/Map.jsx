import React from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api';

const Map = ({ place, onDragEnd }) => {

  const containerStyle = {
    height: '400px',
    alignContent: 'center'
  }

  const defaultProps = {
    zoom: 13
  }
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={defaultProps.zoom}
      center={place.geo}
    >
      <Marker position={place.geo} draggable onDragEnd={onDragEnd} />
    </GoogleMap>
  )
}

export default ({ place, onDragEnd }) => (
  <Map
    place={place}
    onDragEnd={onDragEnd}
  />
)

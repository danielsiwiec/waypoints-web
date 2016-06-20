import React, {Component} from 'react'
import { render } from 'react-dom'

import Map from './Map'
import styles from '../styles/search.css'

export default class Search extends Component{

  render() {
    return (
      <input ref='autocomplete' className={ styles.search } type="text" placeholder="Freddie's Sandwiches"></input>
    )
  }

  componentDidMount() {
    var autocomplete = new google.maps.places.Autocomplete(this.refs.autocomplete)
    autocomplete.addListener('place_changed', () => {
      render(<Map place={autocomplete.getPlace()} />, document.getElementById('root'))
    })
  }
}

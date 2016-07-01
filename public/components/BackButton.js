import React, {Component} from 'react'
import { render } from 'react-dom'

import Search from './Search'
import styles from '../styles/back-button.css'

export default class BackButton extends Component {

  render() {
    return <button type="button" className={styles.button} onClick={this.click.bind(this)}>Back</button>
  }

  click() {
		  render(<Search></Search>, document.getElementById('root'))
  }
}

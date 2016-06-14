import React from 'react'
import Radium from 'radium'

import Notes from '../Notes'
import {modal, modalContent, close, header} from '../styles/modal'

let storageKey = 'sendpointsShowNotes'

class TourBase extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      showNotes: localStorage.getItem(storageKey) < Notes.version
    }
  }

  render() {
    if (this.state.showNotes) {
      return (
        <div style={modal}>
          <div style={modalContent}>
            <span style={close} onClick={this.hide.bind(this)}>Got it!</span>
            <p style={header}>We added new features!</p>
            <ul>
            {Notes.notes.map((note) => {
              return <li>note</li>
            })}
            </ul>
          </div>
        </div>
      )
    } else {
      return (null)
    }
  }

  hide() {
    this.setState({
      showNotes: false
    })
    localStorage.setItem(storageKey, Notes.version)
  }
}

const Tour = Radium(TourBase)

export default Tour

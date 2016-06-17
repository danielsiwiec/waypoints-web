import React from 'react'

import Modal from './Modal'
import modalStyles from '../styles/modal.css'
import modalContentStyles from '../styles/modalContent.css'
import notes from '../Notes'

class Tour extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Modal title="New features!" show={this.state.modal} onClose={this.updateUserVersion.bind(this)}>
        <p>We implemented some new features for you:</p>
        <ul>
          {this.getNewFeatures(this.getUsersVersion()).map((feature) => {
            return <li><strong>{feature.title}</strong> {feature.description}</li>
          })}
        </ul>
      </Modal>
    )
  }

  getUsersVersion(){
    return localStorage.sendpointsShowNotes || 0
  }

  updateUserVersion(){
    localStorage.setItem('sendpointsShowNotes', this.currentVersion())
  }

  currentVersion() {
    return notes.releases
      .reduce((acc, release) => {return acc > release.version ? acc : release.version}, 0)
  }

  componentDidMount() {
    let show = this.getUsersVersion() < this.currentVersion()
    setTimeout(()=> {this.setState({modal: show})}, 1000)
  }

  getNewFeatures(version) {
    return notes.releases
      .filter((release) => {return release.version > version})
      .reduce((acc, release) => {return acc.concat(release.features)}, [])
  }

}

export default Tour

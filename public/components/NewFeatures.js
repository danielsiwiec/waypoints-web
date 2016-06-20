import React, {Component} from 'react'

import Modal from './Modal'
import styles from '../styles/modalContent.css'
import notes from '../Notes.json'

export default class NewFeatures extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Modal title="New features!" show={this.state.modal} onClose={this.updateUserVersion.bind(this)}>
        <p className={styles.subtitle}>We implemented some new features for you:</p>
        <ul className={styles.list}>
          {this.getNewFeatures(this.getUsersVersion()).map((feature) => {
            return <li className={styles.item}><strong>{feature.title}</strong> {feature.description}</li>
          })}
        </ul>
      </Modal>
    )
  }

  getUsersVersion(){
    return localStorage.sendpointsVersion || 0
  }

  updateUserVersion(){
    localStorage.setItem('sendpointsVersion', this.currentVersion())
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

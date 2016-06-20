import React, {Component} from 'react'

import Modal from './Modal'
import styles from '../styles/new-features.css'

export default class NewFeatures extends Component {

  constructor(props) {
    super(props)
    this.state = {showModal: false}
  }

  render() {
    return (
      <Modal show={this.state.showModal}>
        <h3 className={styles.title}>New features!</h3>
        <div className={styles.body}>
          <p className={styles.subtitle}>We implemented some new features for you:</p>
          <ul className={styles.list}>
            {this.getNewFeatures(this.getUsersVersion()).map((feature) => {
              return <li className={styles.item}><strong>{feature.title}</strong> {feature.description}</li>
            })}
          </ul>
          <button className={styles.button} onClick={this.closeModal.bind(this)}>Got it!</button>
        </div>
      </Modal>
    )
  }

  closeModal() {
    this.setState({showModal: false})
    this.updateUserVersion()
  }

  getUsersVersion(){
    return localStorage.sendpointsVersion || 0
  }

  updateUserVersion(){
    localStorage.setItem('sendpointsVersion', this.currentVersion())
  }

  currentVersion() {
    return this.props.notes.releases
      .reduce((acc, release) => {return acc > release.version ? acc : release.version}, 0)
  }

  componentDidMount() {
    let show = this.getUsersVersion() < this.currentVersion()
    setTimeout(()=> {this.setState({showModal: show})}, 1000)
  }

  getNewFeatures(version) {
    return this.props.notes.releases
      .filter((release) => {return release.version > version})
      .reduce((acc, release) => {return acc.concat(release.features)}, [])
  }

}

import React from 'react'
import Home from '../components/Home'
import Head from 'next/head'
import NewFeatures from 'react-new-features-modal'
import notes from '../static/notes.json'

export default () => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Sendpoints</title>
    </Head>
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDeyqJ4Zgbp6uoKDeE7k7b9roaMdq-HQco&libraries=geometry,places"></script>
    <NewFeatures notes={notes} limit={2} />
    <Home />
  </div>
)

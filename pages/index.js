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
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCq6QgNSWFXLbLjXCzbdktiA9maf1Cy6h4&libraries=geometry,places"></script>
    <NewFeatures notes={notes} limit={2} />
    <Home />
  </div>
)
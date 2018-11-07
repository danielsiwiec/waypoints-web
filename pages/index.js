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

      <link rel="icon" sizes="192x192" href="/static/icon.png" />
      <link rel="apple-touch-icon" href="/static/icon.png" />
      <meta name="apple-mobile-web-app-title" content="Sendpoints" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="mobile-web-app-capable" content="yes" />
    </Head>
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDeyqJ4Zgbp6uoKDeE7k7b9roaMdq-HQco&libraries=geometry,places"></script>
    <NewFeatures notes={notes} limit={2} />
    <Home />
  </div>
)

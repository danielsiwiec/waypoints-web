import React from 'react'
import Home from '../components/Home'
import Head from 'next/head'

export default () => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCq6QgNSWFXLbLjXCzbdktiA9maf1Cy6h4&libraries=geometry,places"></script>
    <Home />
  </div>
)
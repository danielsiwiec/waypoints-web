import React from 'react'
import {Grid} from '@material-ui/core'

import BackButton from './BackButton'

export default ({hash, onBack}) => (
  <Grid container justify='center'>
    <Grid item xs={12}>
      <Grid container justify='center'>
        <h1>{hash}</h1>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container justify='center'>
        <BackButton onClick={onBack}/>
      </Grid>
    </Grid>
  </Grid>
)

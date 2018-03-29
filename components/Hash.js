import React from 'react'

import BackButton from './BackButton'

export default ({hash, onBack}) => (
  <div>
    <span>{hash}</span>
    <BackButton onClick={onBack}/>
  </div>
)

import ua from 'universal-analytics'
import { analytics } from './props.json'

module.exports = {
  log: (event, source) => {
    if (source !== 'newrelic') {
      ua(analytics).event('location', event).send()
    }
  }
}

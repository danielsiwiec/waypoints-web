import next from 'next'
import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import ua from 'universal-analytics'

import dao from './dao'

const googleAnalyticsId = 'UA-77110226-1'
const demoHash = '0000'

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

;(async () => {
  app.prepare()
    .then(async () => {
      const server = express()
      server.use(bodyParser.json())
      server.use(compression())

      const Location = await dao.connect()

      server.post('/locations', async (req, res) => {
        let location = convertLongToLng(req)
        console.log(`Saving record ${JSON.stringify(req.body)}`)
        sendToAnalytics('save', req.query.source)
        let record = new Location(location)
        try {
          record.save()
          console.log(`Record ${record._id} saved.`)
          res.json({
            hash: record._id
          })
        } catch (err) {
          console.log(`Error when saving ${record._id}: ${err}`)
        }
      })

      server.get('/locations/:hash', async (req, res) => {
        let hash = req.params.hash
        console.log(`Looking record up by ${hash}`)
        if (hash !== demoHash) {
          sendToAnalytics('get', req.query.source)
        }
        try {
          let location = await Location.findOne({
            '_id': req.params.hash
          })
          console.log(`${hash} found.`)
          res.json(location)
        } catch (err) {
          console.log(`Error when retrieving ${hash}: ${err}`)
        }
      })

      server.get('*', (req, res) => {
        return handle(req, res)
      })

      server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
      })
    })
})()

const sendToAnalytics = (event, source) => {
  if (source !== 'newrelic') {
    ua(googleAnalyticsId).event('location', event).send()
  }
}

const convertLongToLng = req => {
  let body = req.body
  return {
    name: body.name,
    geo: {
      lat: body.geo.lat,
      long: body.geo.lng
    }
  }
}

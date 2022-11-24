import next from 'next'
import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'

import dao from './dao'
import post from './api/post'
import get from './api/get'

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})

;(async () => {
  app.prepare()
    .then(async () => {
      const server = express()
      server.use(bodyParser.json())
      server.use(compression())

      const Location = await dao.connect()

      server.post('/locations', post(Location))
      server.get('/locations/:hash', get(Location))
      server.get('*', app.getRequestHandler())

      server.listen(port, async (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
        console.log('Registering diagnostic location 0000')
        await Location.findOneAndUpdate({_id: '0000'}, {
            name: "Freddie's Sandwiches",
            geo: {
              lat: 37.8051883,
              long: -122.4103007
            }
          },
          {upsert: true}
        )
      })
    })
})()

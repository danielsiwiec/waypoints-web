import next from 'next'
import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import cors from 'cors'

import dao from './dao'
import post from './api/post'
import get from './api/get'

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})

;(async () => {
  app.prepare()
    .then(async () => {
      const whitelist = ['https://www.sendpoints.us', 'https://sendpoints.us', 'http://localhost:3000']
      const corsOptions = {
        origin: function (origin, callback) {
          if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
          } else {
            console.log(`Origin ${origin} not allowed by CORS`)
            callback(new Error(`Origin ${origin} not allowed by CORS`))
          }
        }
      }
      
      const server = express()
      server.use(bodyParser.json())
      server.use(compression())

      server.options('*', cors(corsOptions))

      const Location = await dao.connect()

      server.post('/locations', cors(corsOptions), post(Location))
      server.get('/locations/:hash', cors(corsOptions), get(Location))
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
            },
            expireAt: Date.UTC(2080, 1, 1)
          },
          {upsert: true}
        )
      })
    })
})()

import next from 'next'
import express from 'express'
import compression from 'compression'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import ua from 'universal-analytics'

const googleAnalyticsId = 'UA-77110226-1'
const demoHash = '0000'
let Location

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()
  server.use(bodyParser.json())
  server.use(compression())

  connectToMongo()

  server.post('/locations', (req, res) => {
    let location = convertLongToLng(req)
    console.log(`Saving record ${JSON.stringify(req.body)}`)
    ua(googleAnalyticsId).event('location', 'save').send()
    let record = new Location(location)
    record.save(err => {
      if (err) {
        console.log(`Error when saving ${record._id}: ${err}`)
      } else {
        console.log(`Record ${record._id} saved.`)
        res.json({
          hash: record._id
        })
      }
    })
  })
  
  server.get('/locations/:hash', (req, res) => {
    let hash = req.params.hash
    console.log(`Looking record up by ${hash}`)
    if (hash !== demoHash) {
      ua(googleAnalyticsId).event('location', 'get').send()
    }
    Location.findOne({
      '_id': req.params.hash
    }, (err, location) => {
      if (err) {
        console.log(`Error when retrieving ${hash}: ${err}`)
      } else {
        console.log(`${hash} found.`)
        res.json(location)
      }
    })
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})

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

let connectToMongo = () => {
  console.log('attempting to connect')
  mongoose.connect('mongodb://waypoints:waypoints@ds021671.mlab.com:21671/heroku_27wrdm9m')

  let db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', () => {
    console.log('connected to db')
    Location = mongoose.model('locations', {
      name: String,
      geo: {
        lat: Number,
        long: Number
      },
      _id: {
        type: String,
        default: randomId
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
    })
  })
}

let randomId = () => {
  let random = Math.floor(Math.random() * 10000)
  return String("0000" + random).slice(-4)
}





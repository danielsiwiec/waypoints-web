'use strict'

let express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  ua = require('universal-analytics'),
  googleAnalyticsId = 'UA-77110226-1',
  Location

app.set('port', (process.env.PORT || 5000))

app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

connectToMongo()

app.post('/locations', function (req, res) {
  console.log(`Saving record ${JSON.stringify(req.body)}`)
  ua(googleAnalyticsId).event('location', 'save').send()
  let record = new Location(req.body)
  record.save(function (err) {
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

app.get('/locations/:hash', function (req, res) {
  let hash = req.params.hash
  console.log(`Looking record up by ${hash}`)
  ua(googleAnalyticsId).event('location', 'get').send()
  Location.findOne({
    '_id': req.params.hash
  }, function (err, location) {
    if (err) {
      console.log(`Error when retrieving ${hash}: ${err}`)
    } else {
      console.log(`${hash} found.`)
      res.json(location)
    }
  })
})

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'))
})

function connectToMongo() {
  console.log('attempting to connect')
  mongoose.connect('mongodb://waypoints:waypoints@ds021671.mlab.com:21671/heroku_27wrdm9m')

  let db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', function () {
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

function randomId() {
  let random = Math.floor(Math.random() * 10000)
  return String("0000" + random).slice(-4)
}

'use strict'

let express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  shortid = require('shortid'),
  Location

app.set('port', (process.env.PORT || 5000))

app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

connectToMongo()

app.post('/locations', function (req, res) {
  console.log(`Saving record ${JSON.stringify(req.body)}`)
  let record = new Location(req.body)
  record.save(function (err) {
    if (err) {
      console.log(`Error when saving ${record._id}: ${err}`)
    } else {
      console.log(`Record ${record._id} saved.`)
      res.send(JSON.stringify({hash: record._id}))
    }
  })
})

app.get('/locations/:hash', function (req, res) {
  let hash = req.params.hash
  console.log(`Looking record up by ${hash}`)
  Location.findOne({
    '_id': req.params.hash
  }, function (err, location) {
    if (err) {
      console.log(`Error when retrieving ${hash}: ${err}`)
    } else {
      console.log(`${hash} found.`)
      res.send(location)
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
  db.once('open', function() {
    console.log('connected to db')
    Location = mongoose.model('locations', {
      name: String,
      geo: {
        lat: Number,
        long: Number
      },
      _id: {
        type: String,
        'default': shortid.generate
      }
    })
  })
}

'use strict'

let express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  shortid = require('shortid')

app.set('port', (process.env.PORT || 5000))

app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
mongoose.connect('mongodb://waypoints:waypoints@ds021671.mlab.com:21671/heroku_27wrdm9m')

let Location = mongoose.model('locations', {
  hash: String,
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

app.post('/', function (req, res) {
  let record = new Location(req.body)
  record.save(function (err) {
    if (err) {
      console.log(`Error when saving ${record._id}: ${err}`)
    } else {
      console.log(`${record._id} saved.`)
    }
  })
  res.send(record._id)
})

app.get('/:hash', function (req, res) {
  console.log(`Looking record up by ${req.params.hash}`)
  Location.findOne({
    '_id': req.params.hash
  }, function (err, location) {
    if (err) {
      console.log(`Error when retrieving ${req.params.hash}: ${err}`)
    } else {
      res.send(location)
    }
  })
})

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'))
})

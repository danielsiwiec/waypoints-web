'use strict'

let express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser')

app.set('port', (process.env.PORT || 5000))

app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
mongoose.connect('mongodb://waypoints:waypoints@ds021671.mlab.com:21671/heroku_27wrdm9m')


app.post('/', function (req, res) {
  let location = req.body
  var Loc = mongoose.model('locations', {
    hash: String,
    name: String,
    geo: {
      lat: Number,
      long: Number
    }
  });
  location.hash = 'abc'

  var record = new Loc(location);
  record.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('meow');
    }
  });
  res.send(location.hash);
});

app.get('/:hash', function (req, res) {
  console.log('you asked for ' + req.params.hash)
})

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});

import mongoose, { Schema } from 'mongoose'

module.exports = {
  connect: async () => {
    console.log('attempting to connect')
    await mongoose.connect('mongodb://waypoints:waypoints@ds021671.mlab.com:21671/heroku_27wrdm9m')
    console.log('connected to db')

    return mongoose.model('locations', new Schema({
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
      }
    }))
  }
}

let randomId = () => {
  let random = Math.floor(Math.random() * 10000)
  return String('0000' + random).slice(-4)
}

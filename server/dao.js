import mongoose, { Schema } from 'mongoose'
import { db } from './props.json'

module.exports = {
  connect: async () => {
    console.log('attempting to connect')
    await mongoose.connect(db, { useNewUrlParser: true })
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

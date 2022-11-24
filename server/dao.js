import mongoose, {Schema} from 'mongoose'
import {db} from './props.json'

const hoursToExpire = 2

module.exports = {
  connect: async () => {
    console.log('attempting to connect')
    await mongoose.connect(db)
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
      expireAt: {
        type: Date,
        expires: 60 * 60 * 5,
        default: () => new Date(Date.now() + 1000 * 60 * 60 * hoursToExpire)
      }
    }, {timestamps: true}))
  }
}

let randomId = () => {
  let random = Math.floor(Math.random() * 10000)
  return String('0000' + random).slice(-4)
}

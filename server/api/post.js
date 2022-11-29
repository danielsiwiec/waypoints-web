import analytics from '../analytics'
import Ajv from 'ajv'

module.exports = Location => {

  const ajv = new Ajv()

  const schema = {
    type: 'object',
    properties: {
      name: {type: 'string'},
      geo: {
        type: 'object',
        properties: {
          lat: {type: 'number'},
          lng: {type: 'number'}
        },
        required: ['lat', 'lng']
      },
    },
    required: ['name', 'geo'],
    additionalProperties: false,
  }

  const validate = ajv.compile(schema)

  return async (req, res) => {

    if (!validate(req.body)) {
      console.log(validate.errors)
      res.sendStatus(400)
      return
    }

    let location = convertLongToLng(req)
    console.log(`Saving record ${JSON.stringify(req.body)}`)
    analytics.log('save', req.query.source)
    let record = new Location(location)
    try {
      record.save()
      console.log(`Record ${record._id} saved.`)
      res.json({
        hash: record._id
      })
    } catch (err) {
      console.log(`Error when saving ${record._id}: ${err}`)
    }
  }
}

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

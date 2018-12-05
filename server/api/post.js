import analytics from '../analytics'

module.exports = Location => {
  return async (req, res) => {
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

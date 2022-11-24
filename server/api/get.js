import analytics from '../analytics'

const demoHash = '0000'

module.exports = Location => {
  return async (req, res) => {
    let hash = req.params.hash
    console.log(`Looking record up by ${hash}`)
    if (hash !== demoHash) {
      analytics.log('get', req.query.source)
    }
    try {
      let location = await Location.findOne({
        '_id': req.params.hash
      })
      if(location) {
        console.log(`${hash} found.`)
        res.json(location)
      } else {
        console.log(`${hash} NOT found.`)
        res.sendStatus(404)
      }
    } catch (err) {
      console.log(`Error when retrieving ${hash}: ${err}`)
    }
  }
}

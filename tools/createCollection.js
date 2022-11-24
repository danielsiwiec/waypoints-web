db.locations.drop()
db.createCollection('locations')
db.locations.createIndex({ 'expireAt': 1 }, { expireAfterSeconds: 0 })
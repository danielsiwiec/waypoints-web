db.locations.drop()
db.createCollection('locations')
db.locations.createIndex({ 'createdAt': 1 }, { expireAfterSeconds: 3600 })

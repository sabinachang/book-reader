const wallDirector = require('./wallObserverHelpers/wallDirector')

class WallObserver {
  constructor(wallDirector) {
    this.subjectRequestTypes = []
    this.wallDirector = wallDirector
  }

  readRequest = (req, res, next) => {
    const request_type = req.body.request_type
    if (this.subjectRequestTypes.includes(request_type)) {
      console.log('creating...')
      // create a post on the public wall according to the request_type
      this.wallDirector.create(request_type)
      console.log("added to database")
      next()
    } else {
      console.log('Do nothing...')
      next()
    }
  }
}

const observer = new WallObserver(wallDirector)

module.exports = observer;
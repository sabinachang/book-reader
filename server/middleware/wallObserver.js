const wallDirector = require('../models/wallObserverHelpers/wallDirector')

class WallObserver {
  constructor(wallDirector) {
    this.wallDirector = wallDirector
  }

  readRequest = (req, res, next) => {
    const request_type = req.body.request_type
    // create a post on the public wall according to the request_type
    this.wallDirector.create(request_type)
    console.log("Finish reading request")
    next()

  }
}

const observer = new WallObserver(wallDirector)

module.exports = observer;
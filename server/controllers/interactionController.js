const recommendationCreator = require('../lib/recommendationCreator');
const Friendship = require('../models/friendship');

exports.getFriends = async function getFriends(req, res, next) {
  // TODO use real username from req
    try {
      const list =  await Friendship.list('mary');
      console.log(list);
      res.json({
        list: list,
      })
    } catch (e) {
      console.log(e);
    }
}

// A factory that generates request for friendship or book recommendation
exports.requestFactory = async function (req, res, next) {
  const type = req.params.type;
  try {
    if (type === 'recommendBook') {
      // let recommendationCreator handles recommendation creation logic
      await recommendationCreator.generateRequest(req.body.to, req);
      res.json({
        status: 'success',
        message: 'ok! book has been recommended.',
      })
    }
  } catch (e) {
    console.log(e);
    res.json({
      status: 'error',
      message: 'something went wrong. try again.',
    })
  }
  
}
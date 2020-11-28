const recommendationCreator = require('../lib/recommendationCreator');
const Friendship = require('../models/friendship');

exports.getFriends = async function getFriends(req, res, next) {
    try {
      const list =  await Friendship.list(req.cookies.username);
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

    if (type === 'invitation') {
      await Friendship.sendInvitation(req.cookies.username, req.body.to);
      res.status(200).send('invitation send ok')
    }
  } catch (e) {
    console.log(e);
    res.json({
      status: 'error',
      message: 'something went wrong. try again.',
    })
  }
  
}

exports.handleInvitations = async function (req, res, next) {
  const action = req.params.action
  try{
    if (action === 'accept') {
      await Friendship.add(req.cookies.username, req.body.to)
      res.status(200).send('accept invitation ok');
    }

    if (action === 'deny') {
      // TODO add deny
    }
  } catch (e) {
    console.log(e);
  }
}
exports.getCompleteFrienshipInfo = async function (req, res, next) {
  const me = req.cookies.username;

  try {
    const f = await Friendship.list(me);
    const c = await Friendship.listCandidates(me);
    const i = await Friendship.listInvitations(me);

    res.status(200).json({
      friends: f.friends,
      candidates: c,
      invitations: i.invitations,
    })

  } catch(e) {
    res.status(400).json({
      error: err.message,
    })
  }
 


}
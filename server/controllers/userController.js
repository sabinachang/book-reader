const { createNewUser, findUserByUsername, updateUserDescription } = require('../models/user');
const { validatePassword } = require('../lib/password');
const { genHashAndSalt } = require('../lib/password');
const { createToken, verifyToken } = require('../lib/jwt');


const createUser = function (req, res) {
  const { username, password } = req.body;
  // create new user and save to db
  const { hash, salt } = genHashAndSalt(password);
  createNewUser(username, hash, salt)
    .then(async () => {
      console.log('create user successfully', username);
      const user = await findUserByUsername(username);
      const token = createToken(user);
      const cookieMaxAge = 3 * 24 * 60 * 60;
      res.cookie('jwt', token, {
        maxAge: cookieMaxAge * 1000,
      });
      res.cookie('username', username, {
        maxAge: cookieMaxAge * 1000,
      })
      res.status(201).json({ message: 'create user successfully' });
    })
    .catch((err) => {
      console.log(err)
      let message;
      if (err.code === 11000) {
        console.log('Username already exists');
        message = 'Username already exists';
      } else {
        message = err;
      }
      res.status(400).json({ error: message });
    });
}

const login = async function (req, res) {
  const { username, password } = req.body;
  try {
    const user = await findUserByUsername(username);
    // username does not exists
    if (!user) {
      res.status(404).json({
        error: 'Username does not exist',
      });
    } else {
      // user exists, check if password is correct
      if (validatePassword(password, user.hash, user.salt)) {
        // generate jwt and return it in response
        const token = createToken(user);
        const cookieMaxAge = 3 * 24 * 60 * 60 * 1000;
        res.cookie('jwt', token, {
          maxAge: cookieMaxAge,
        });
        res.cookie('username', username, {
          maxAge: cookieMaxAge,
        })
        // User.updateOnlineStatus(username, true).then(() => {
        res.status(200).send({ message: 'login successfully' });
        // });
      } else {
        res.status(400).json({
          error: 'Password incorrect',
        });
      }
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

const logout = function (req, res) {
  res.clearCookie('jwt');
  res.clearCookie('username')
  res.status(200).json({ message: "logged out successfully" })
}

const checkAuth = function (req, res) {
  try {
    const payload = verifyToken(req.cookies.jwt)
    if (!req.cookies.username || payload.username !== req.cookies.username) {
      res.status(403).json({ message: "unauthenticated" })
    } else {
      res.status(200).json({ message: 'authenticated' })
    }
  } catch (err) {
    res.status(403).json({ message: "unauthenticated" })
  }

}
const getDescription = async function (req, res) {
  try {
    const username = req.params.username
    const user = await findUserByUsername(username)

    res.status(200).json({user})
  } catch (err) {
    res.sendStatus(500)
  }
}

const updateDescription = async function (req, res) {
  try {
    const username = req.params.username
    const description = req.body.description

     await updateUserDescription(username, description)
    res.sendStatus(200)

  } catch (err) {
    res.sendStatus(500)
  }
}

module.exports = {
  createUser,
  login,
  logout,
  checkAuth,
  getDescription,
  updateDescription
};


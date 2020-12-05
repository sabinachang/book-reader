const { createNewUser, findUserByUsername, validateUsernamePassword } = require('../models/user');

const { genHashAndSalt } = require('../lib/password');
const { createToken } = require('../lib/jwt');
const User = require('../models/user');


class UserController {
  static createUser(req, res) {
    const { username, password } = req.body;

    //check if username and password are valid
    try {
      validateUsernamePassword(username, password);
    } catch(err) {
      res.status(400).json({ error: err });
    }

    // create new user and save to db
    const { hash, salt } = genHashAndSalt(password);
    User.createNewUser(username, hash, salt)
      .then( async () => {
        console.log('create user successfully', username);
        const user = await findUserByUsername(username);
        const token = createToken(user);
        const cookieMaxAge = 3 * 24 * 60 * 60 * 1000;
        res.cookie('jwt', token, {
          maxAge: cookieMaxAge,
        });
        res.cookie('username', username, {
          maxAge: cookieMaxAge,
        })
        res.status(201).send({ message: 'create user successfully' });
      })
      .catch((err) => {
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
}

module.exports = UserController;


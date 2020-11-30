const { createNewUser, findUserByUsername } = require('../models/user');

const { genHashAndSalt } = require('../lib/password');
const { createToken } = require('../lib/jwt');


class UserController {
  static createUser(req, res) {
    const { username, password } = req.body;
    // create new user and save to db
    const { hash, salt } = genHashAndSalt(password);
    createNewUser(username, hash, salt)
      .then(async () => {
        console.log('create user successfully');
        const user = await findUserByUsername(username);
        const token = createToken(user);
        const cookieMaxAge = 3 * 24 * 60 * 60;
        res.cookie('jwt', token, {
          maxAge: cookieMaxAge * 1000,
        });
        res.cookie('username', username, {
          maxAge: cookieMaxAge * 1000,
        })
        res.status(201).send({ message: 'create user successfully' });
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
}

module.exports = UserController;


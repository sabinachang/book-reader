const { createNewUser, findUserByUsername } = require('../models/user');
const { genHashAndSalt } = require('../lib/password');
const { createToken } = require('../lib/jwt');
const cookieMaxAge = 3 * 24 * 60 * 60 * 1000;


class UserController {
  static createUser(req, res) {
    const { username, password } = req.body;

    // create new user and save to db
    const { hash, salt } = genHashAndSalt(password);
    createNewUser(username, hash, salt)
      .then(async () => {
        const user = await findUserByUsername(username);
        const token = createToken(user);
        res.cookie('jwt', token, {
          maxAge: cookieMaxAge,
        });
        res.cookie('username', username, {
          maxAge: cookieMaxAge,
        })
        console.log('Register: ' + token);
        res.status(201).send({ message: 'create user successfully' });
      })
      .catch((err) => {
        console.log('catch create user error');
        let message;
        if (err.code === 11000) {
          message = 'Username already exists';
        } else {
          message = err.message;
        }
        res.status(400).json({ error: message });
      });
  }
}

module.exports = UserController;


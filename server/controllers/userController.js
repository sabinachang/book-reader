const {
    User,
    createNewUser,
} = require('../models/user');

const { genHashAndSalt } = require('../lib/password');

class UserController {
    static createUser(req, res) {
        const { username, password } = req.body;
    
        // create new user and save to db
        const { hash, salt } = genHashAndSalt(password);
        createNewUser(username, hash, salt)
          .then(() => {
            res.status(201).send({ message: 'create user successfully' });
            res.location('/home').json({});
          })
          .catch((err) => {
            let message;
            if (err.code === 11000) {
              message = 'Username already exists';
            } else {
              message = Object.values(err.errors)[0].properties.message;
            }
            res.status(400).json({ error: message });
          });
    }
}

module.exports = UserController;


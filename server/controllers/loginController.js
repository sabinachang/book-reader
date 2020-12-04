const { User, findUserByUsername, updateOnlineStatus } = require('../models/user');
const { validatePassword } = require('../lib/password');
const { createToken } = require('../lib/jwt');

class LoginController {
    static async login(req, res) {
        const { username, password } = req.body;
        
        try {
          const user = await findUserByUsername(username);    
          // username does not exists
          if (!user) {
            res.status(400).json({
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

    static logout(req, res) {
      const { username } = req.body;
      User.updateOnlineStatus(username, false)
        .then(() => {
          res.status(200).end();
        })
        .catch((err) => {
          res.status(400).json({ error: err.message });
        });
    }
}

module.exports = LoginController;
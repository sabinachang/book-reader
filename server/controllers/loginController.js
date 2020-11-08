const { User, findUserByUsername } = require('../models/user');

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
          }
    
          // user exists, check if password is correct
          if (validatePassword(password, user.hash, user.salt)) {
            // generate jwt and return it in response
            const token = createToken(user);
            const cookieMaxAge = 3 * 24 * 60 * 60;
            res.cookie('jwt', token, {
              maxAge: cookieMaxAge * 1000,
            });
            res.location('/home').json({});

          } else {
            res.status(400).json({
              error: 'Password incorrect',
            });
          }
        } catch (err) {
          res.status(400).json({ error: err.message });
        }
    }
}

module.exports = LoginController;
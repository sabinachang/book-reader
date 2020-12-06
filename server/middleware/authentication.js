const { verifyToken } = require('../lib/jwt');

const authenticateUser = (req, res, next) => {
  const token = req.cookies.jwt;
  // check json web token exists & is verified
  if (token) {
    verifyToken(token, (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.status(401).end();
      } else {
        next();
      }
    });
  } else {
    res.status(401).end();
  }
};

module.exports = { authenticateUser };
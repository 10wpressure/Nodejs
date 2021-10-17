const CustomError = require('../errors');
const { isTokenValid } = require('../utils');

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    console.error('error no token present');
  } else {
    console.log('token is present');
  }

  next();
};

module.exports = {
  authenticateUser,
};

const jwt = require('jsonwebtoken');
const {BadRequestError} = require('../errors');

const login = async (req, res) => {
  const { username, password } = req.body;

  // mongo validation
  // Joi - validation app
  // check inside the controller

  if (!username || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  // just for DEMO, normally provided by db
  const id = new Date().getDate();

  // payload, try to keep it small, better for the slow connections
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.status(200).json({ msg: 'user created', token });
};
const dashboard = async (req, res) => {
  console.log(req.user);
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here's your authorized data bitch,your lucky huyacky number is ${luckyNumber}`,
  });
};
module.exports = { login, dashboard };

const CustomAPIError = require('../errors/custom-error');

const login = async (req, res) => {
  const { username, password } = req.body;

  // mongo validation
  // Joi - validation app
  // check inside the controller

  if (!username || !password) {
    throw new CustomAPIError('Please provide email and password', 400);
  }
  console.log(username, password);
  res.send('Fake Login/Register/Signup');
};
const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, John Doe`,
    secret: `Here's your authorized data bitch,your lucky huyacky number is ${luckyNumber}`,
  });
};
module.exports = { login, dashboard };

// .env reader
require('dotenv').config();
// async error wrapper 
require('express-async-errors');

// express
const express = require('express');
const app = express();

// database
const connectDB = require('./db/connect');

// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());

// Home page
app.get('/', (req, res) => {
  res.send(`E-Commerce API`);
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async (port) => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`Server is running on port: ${port}`));
  } catch (error) {
    console.error(error);
  }
};

start(port);

const express = require('express');
app = express();
port = 5000;
// req => middleware => res

const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().getFullYear();
  console.log(method, url, time);
  next();
};

app.get('/', logger, (req, res) => {
  res.send('Home');
});
app.get('/about', logger, (req, res) => {
  res.send('About');
});

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});

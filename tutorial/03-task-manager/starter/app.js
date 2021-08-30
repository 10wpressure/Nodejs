const express = require('express');
app = express();

const tasks = require('./routes/tasks');

// middleware
app.use(express.json());

// routes
app.get('/hello', (req, res) => {
  res.send('Task Manager App');
});

app.use('/api/v1/tasks', tasks);

const port = 3000;

app.listen(
  port,
  `localhost`,
  444,
  console.log(`Server is listening on the port ${port}...`),
);

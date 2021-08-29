const express = require('express');
app = express();

// routes
app.get('/hello', (req, res) => {
  res.send('Task Manager App');
});

const port = 3000;

app.listen(port, console.log(`Server is listening on the port ${port}...`));

const express = require('express');
const app = express();
const port = 4000;
app.get('/test', (req, res) => {
  res.json(200, 'test Ok');
});

app.post('/register', (req, res) => {});
app.listen(port);

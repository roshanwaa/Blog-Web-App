const express = new require('express');
const { default: mongoose } = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
// console.log(process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL);

app.post('/register', (req, res) => {
  const { userName, userEmail, userPassword } = req.body;

  res.json({
    requestData: { userName, userEmail, userPassword },
  });
});

app.listen(port);

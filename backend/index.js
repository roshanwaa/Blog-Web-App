const express = new require('express');
const { mongoose } = require('mongoose');
const cors = require('cors');
const User = require('./Models/User');
const bcrypt = require('bcrypt');
require('dotenv').config();
var jwt = require('jsonwebtoken');

const app = express();
const port = 4000;

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

const salt = bcrypt.genSaltSync(10);
app.use(cors());
app.use(express.json());

// mongoose.connect(process.env.MONGO_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

mongoose.Promise = global.Promise;
mongoose.connect(
  'mongodb+srv://MrSmokeDB:TH5TgnJfvABSICBC@blogappcluster.rrgcuhi.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.get('/test', function (req, res) {
  res.json('Hello Test! Im Roshan.waa is a blog website');
});

app.post('/register', async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;
  try {
    const userDoc = await User.create({
      userName,
      userEmail,
      userPassword: bcrypt.hashSync(userPassword, salt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post('/login', async (req, res) => {
  const { userEmail, userPassword } = req.body;

  const userDoc = await User.findOne({ userEmail });
  const passOk = bcrypt.compareSync(userPassword, userDoc.userPassword);

  if (passOk) {
    jwt.sign({ userEmail, id: userDoc._id }, token, {}, (err, resToken) => {
      if (err) throw err;

      res.json(resToken);
    });
  } else {
    res.status(400).json('Wrong password!');
  }
});

app.listen(port);

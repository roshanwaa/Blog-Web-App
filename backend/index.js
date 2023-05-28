const express = new require('express');
const { mongoose } = require('mongoose');
const cors = require('cors');
const User = require('./Models/User');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

require('dotenv').config();
const jwt = require('jsonwebtoken');

const app = express();
const port = 4000;

const secretToken = process.env.SECRET_TOKEN;
// const secretToken =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJhdWQiOiIxMzQiLCJleHAiOjE1MDMwNTk5OTksImlzcyI6Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDYvaWRlbnRpdHkiLCJpc3MiOiJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI.S_XxuS_fThOG1Rsi77YOb_oR7-Wg-9uX3rJcFIG25vA';

const salt = bcrypt.genSaltSync(10);
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(cookieParser());

// mongoose.connect(process.env.MONGO_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

mongoose.Promise = global.Promise;
mongoose.connect(
  'mongodb+srv://MrSmokeDB:TH5TgnJfvABSICBC@blogappcluster.rrgcuhi.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.get('/', function (req, res) {
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
    jwt.sign(
      { userEmail, id: userDoc._id },
      secretToken,
      {},
      (err, resToken) => {
        if (err) throw err;
        res.cookie('token', resToken).json('Ok');
      }
    );
  } else {
    res.status(400).json('Wrong password!');
  }
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, secretToken, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post('/signOut', (req, res) => {
  res.cookie('token', '').json('Ok');
});

app.listen(port);

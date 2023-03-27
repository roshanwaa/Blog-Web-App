const express = new require('express');
const { default: mongoose } = require('mongoose');
const cors = require('cors');
const User = require('./Models/User');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const port = 4000;

const salt = bcrypt.genSaltSync(10);
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL);

// mongoose.connect(
//   'mongodb+srv://MrSmokeDB:TH5TgnJfvABSICBC@blogappcluster.rrgcuhi.mongodb.net/?retryWrites=true&w=majority'
// );

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

app.listen(port);

const express = new require('express');
const { mongoose } = require('mongoose');
const cors = require('cors');
const User = require('./Models/User');
const Post = require('./Models/Post');
const bcrypt = require('bcrypt');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const fs = require('fs');

require('dotenv').config();
const jwt = require('jsonwebtoken');

const newLocal = 'uploads/';
const upload = multer({ dest: newLocal });

// const uploadMIddleWare = multer({ dest: newLocal });

const app = express();
const port = 4000;

// const secretToken = process.env.SECRET_TOKEN;
const secretToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJhdWQiOiIxMzQiLCJleHAiOjE1MDMwNTk5OTksImlzcyI6Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDYvaWRlbnRpdHkiLCJpc3MiOiJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI.S_XxuS_fThOG1Rsi77YOb_oR7-Wg-9uX3rJcFIG25vA';

const salt = bcrypt.genSaltSync(10);
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

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
        res.cookie('token', resToken).json({
          id: userDoc._id,
          userEmail,
        });
      }
    );
  } else {
    res.status(400).json('Wrong password!');
  }
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, secretToken, {}, (err, info) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    res.json(info);
  });
});

app.post('/signOut', (req, res) => {
  res.cookie('token', '').json('Ok');
});

app.post('/post', upload.single('file'), async (req, res) => {
  const { originalname, path } = req.file;
  const partsName = originalname.split('.');
  const ext = partsName[partsName.length - 1];
  const newFileName = path + '.' + ext;
  fs.renameSync(path, newFileName);

  const { token } = req.cookies;
  jwt.verify(token, secretToken, {}, async (err, info) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const { title, summary, content, author } = req.body;
    const postDoc = await Post.create({
      title: title,
      summary: summary,
      content: content,
      cover: newFileName,
      author: info.id,
    });
    res.json(postDoc);
  });
});

app.get('/post', async (req, res) => {
  const blogPost = await Post.find()
    .populate('author', ['userName'])
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(blogPost);
});

app.get('/post/:id', async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate('author', ['userName']);
  res.json(postDoc);
});

app.put('/post', upload.single('file'), async (req, res) => {
  let newFileName = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const partsName = originalname.split('.');
    const ext = partsName[partsName.length - 1];
    newFileName = path + '.' + ext;
    fs.renameSync(path, newFileName);
  }

  const { token } = req.cookies;
  jwt.verify(token, secretToken, {}, async (err, info) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json('Your are note author');
    }

    // Update the fields and then save the document
    postDoc.title = title;
    postDoc.summary = summary;
    postDoc.content = content;
    postDoc.cover = newFileName ? newFileName : postDoc.cover;
    await postDoc.save();

    res.json(postDoc);
  });
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

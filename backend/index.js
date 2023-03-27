const express = new require('express');
var cors = require('cors');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.post('/register', (req, res) => {
  const { userName, userEmail,  userPassword } = req.body;

  res.json({
    requestData: { userName, userEmail, userPassword },
  });
});

app.listen(port);

var express = require('express');
var cors = require('cors');
var multer = require('multer');
require('dotenv').config();

var app = express();

// Middleware
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Multer setup: define where files will be temporarily stored
var upload = multer({ dest: 'uploads/' });

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Handle file upload at /api/fileanalyse
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  console.log('File upload request received');
  console.log('File:', req.file); // Log file information
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const file = req.file;
  res.json({
    filename: file.originalname,
    type: file.mimetype,
    size: file.size
  });
});

const port = process.env.PORT;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});

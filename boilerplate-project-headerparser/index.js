const express = require('express');
const app = express();
const cores=require('cores');
require('dotenv').config()
// app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204



app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/whoami' , function (req, res){
  const ipadress = req.params.ip
  const language = req.headers.get('accept-language') 
  const software = req.params.headers.get('user-agent')

  res.json({
    ipaddress: ipaddress,
    language: language,
    software: software  
    })

})


var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

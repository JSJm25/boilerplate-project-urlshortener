
const express = require('express');
const app = express();

const cors = require('cors');

require('dotenv').config();
const port = process.env.PORT;

const { MongoClient } = require('mongodb');
const client = new MongoClient();

let myDir = __dirname + "/views/index.html";

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));


app.use((req, res, done) =>{
  let d = new Date().toUTCString();
  console.log(`${req.method}    ${req.path} - ${req.ip} at ${d}`);
  done();
});

app.get('/', function(req, res) {
  res.sendFile(myDir);
});

// Your first API endpoint
app.get('/api/shorturl', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
  console.log(`https://localhost:${port}/`);
});


const express = require('express');
const app = express();

const cors = require('cors');

require('dotenv').config();
const port = process.env.PORT;

const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGOURI);
const db = client.db('urlShortner');
const urls = db.collection("urls");

const dns = require('dns');
const urlParser = require("url");

let myDir = __dirname + "/views/index.html";

app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

app.use('/public', express.static(`${process.cwd()}/public`));


app.use((req, res, done) =>{
  let d = new Date().toUTCString();
  console.log(`${req.method}    ${req.path} - ${req.ip} at ${d} \n ${req.body}`);
  done();
});

app.get('/', function(req, res) {
  res.sendFile(myDir);
});

// Your first API endpoint
app.post('/api/shorturl', function(req, res) {
  const dnsCheck = dns.lookup(urlParser.parse(req.body.url).hostname,
  async (err, address) => {
    if(!address){
      res.json({error: "Invalid URL"});
    } else {
      const urlNum = Math.floor(new Date().valueOf());
      var url = req.body.url
      const urlObj = {
        original_url: url,
        shortUrl: urlNum
      }
      const result = await urls.insertOne(urlObj);
      res.json({
        original_url: urlObj.original_url,
        short_url: urlObj.shortUrl
      });
    }
  })
});

app.get('/api/shorturl/:short_url', async (req, res) => {
  const _shortUrl = req.params.short_url;
  const urlObj = await urls.findOne({shortUrl: +_shortUrl});
  let destination = urlObj.original_url
  res.redirect(destination);
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
  console.log(`localhost:${port}`);
});

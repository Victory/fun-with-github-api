var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var queryString = require("querystring");

var app = express();

var apiBase = "https://api.github.com";
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('<form method="POST"><input name="location"><button>Submit</button></form>');
});

app.post('/', function (req, res) {
  var location = req.body.location;
  if (typeof location === "undefined") {
    res.redirect('/');
  }

  var endpoint = apiBase + "/search/users?";
  var query = queryString.stringify({q: "javascript", location: location});

  var options = {
    url: endpoint + query,
    headers: {
      'User-Agent': 'Victory'
    }
  };

  request(options, function (err, response, body) {
    if (!err && response.statusCode === 200) {
      res.writeHead(200, {"Content-Type": "application/json"});
      res.end(body);
    } else if (err) {
      res.send(err);
    } else {
      res.send(body);
    }
  });
});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});

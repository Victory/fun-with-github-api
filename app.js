var express = require('express');
//var request = require('request');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('<form method="POST"><input name="location"><button>Submit</button></form>');
});

app.post('/', function (req, res) {
  console.log(req.body.location);
  res.redirect('/');
});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});

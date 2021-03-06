var http = require('http');
var fs = require('fs');
var express = require('express');
var bodyParser = require("body-parser");
var request = require('request');

var app = express();
var server = http.createServer(app);


app.use(bodyParser());

process.on('uncaughtException', function (err) {
  console.log(err);
});

var opt = {
  hostname: "https://www.google.com/recaptcha/api/siteverify",
  secret: "YOUR SECRET"
}

app.get('/form', function (req, res) {
  res.sendfile('form.html');
});

app.post('/form', function (req, res) {
  var cpt = req.body["g-recaptcha-response"];
  var form = {
    "secret": opt.secret,
    "response": cpt
  };

  request.post({url: opt.hostname, form: form}, function (err, res) {
    if (err) throw err;
    console.log("success:", res.body.success);
  });
});


server.listen(5050, function () {
  console.log('listening 5050')
});

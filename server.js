// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// Simple in-memory store for now
var numbers = [];

app.get("/dreams", function (request, response) {
  var res={};
  res.guessNumber=Math.floor(Math.random() * 101);
  numbers=[];
  res.numbers=numbers;
  response.send(res);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  var number=request.query.number,
  status="error";
  numbers.push(number);
  if (number<request.query.guessNumber){
    status='cold';
  }else if (number>request.query.guessNumber)
  {
    status='hot';
  }else if (number==request.query.guessNumber)
  {
    status='correct';
  }
  console.log(response);
   
  response.send({ status: status, number:number, numbers:numbers });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
/**
 *
 */

console.log("Starting server...");
console.time("Node startup time");
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

// Handles root request
app.get('/', function(req, res){
  res.send('Home');
// Handles /hello requests
}).get('/hello', function(req, res){
  res.send('hello world');
});

//require("./public/assignment3/server/app.js")(app);

app.listen(port, ipaddress);



console.log("Server started.");
console.timeEnd("Node startup time"); 
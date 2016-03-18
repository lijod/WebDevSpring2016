console.log("Starting server...");
console.time("Node startup time");
var express       = require('express');
var bodyParser    = require('body-parser');
var multer        = require('multer');
var session       = require('express-session');
var cookieParser  = require('cookie-parser');
var uuid = require('node-uuid');

var app = express();
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(session({ secret: "lijo_key" }));
console.log("Secret: ", process.env.PASSPORT_SECRET);
//app.use(session({ secret: process.env.PASSPORT_SECRET }));
app.use(cookieParser())

// Handles root request
app.get('/', function(req, res){
  res.send('Home');
// Handles /hello requests
}).get('/hello', function(req, res){
  res.send('hello world');
});

require("./public/assignment-node/server/app.js")(app, uuid);

app.listen(port, ipaddress);

console.log("Server started.");
console.timeEnd("Node startup time"); 
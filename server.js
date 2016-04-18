console.log("Starting server...");
console.time("Node startup time");
var express       = require('express');
var bodyParser    = require('body-parser');
var multer        = require('multer');
var passport      = require('passport');
var session       = require('express-session');
var cookieParser  = require('cookie-parser');
//var uuid = require('node-uuid');

var app = express();
app.use(express.static(__dirname + '/public'));
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var mongoose = require("mongoose");

var connectionString = 'mongodb://localhost/webdev2016-assignment';

// use remote connection string
// if running in remote server
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
  connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
      process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
      process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
      process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
      process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(session({
    secret: process.env.PASSPORT_SECRET,
    resave: true,
    saveUninitialized: true}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


var assignmentUserModel = require("./public/assignment/server/models/user.model")(db);
var projectUserModel = require("./public/project/server/model/user.model.js")(db);
var securityService = require("./public/common-service/security.js")(assignmentUserModel, projectUserModel);
var passport = securityService.getPassport();

require("./public/assignment/server/app.js")(app, passport, db, assignmentUserModel);
require("./public/project/server/app.js")(app, passport, db, projectUserModel);

app.listen(port, ipaddress);

console.log("Server started.");
console.timeEnd("Node startup time"); 
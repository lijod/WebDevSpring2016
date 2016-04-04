"use strict";
module.exports = function(app, db) {
    console.log("Assignment server loaded!");

    var userModel = require("./model/user.model.js")(db);
    var reviewModel = require("./model/review.model.js")(db);

    require("./service/user.service.server.js") (app, userModel);
    require("./service/review.service.server.js") (app, reviewModel);

};
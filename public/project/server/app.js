"use strict";
module.exports = function(app, uuid) {
    console.log("Assignment server loaded!");

    var userModel = require("./model/user.model.js")(uuid);
    var reviewModel = require("./model/review.model.js")(uuid);

    require("./service/user.service.server.js") (app, userModel);
    require("./service/review.service.server.js") (app, reviewModel);

};

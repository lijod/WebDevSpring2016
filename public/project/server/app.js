"use strict";
module.exports = function(app, uuid) {
    console.log("Assignment server loaded!");

    var userModel = require("./models/user.model.js")(uuid);

    require("./services/user.service.server.js") (app, userModel);

};

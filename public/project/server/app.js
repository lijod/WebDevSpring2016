"use strict";
module.exports = function(app, uuid) {
    console.log("Assignment server loaded!");

    var userModel = require("./model/user.model.js")(uuid);

    require("./service/user.service.server.js") (app, userModel);

};

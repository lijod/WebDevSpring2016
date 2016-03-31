"use strict";
module.exports = function(app, db) {
    console.log("Assignment server loaded!");

    var userModel    = require("./models/user.model.js")(db);
    var formModel   = require("./models/form.model.js")(db);
    var fieldModel   = require("./models/field.model.js")(formModel);

    require("./services/user.service.server.js") (app, userModel);
    require("./services/form.service.server.js") (app, formModel);
    require("./services/field.service.server.js") (app, fieldModel);

};

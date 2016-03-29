"use strict";
module.exports = function(app, db, uuid) {
    console.log("Assignment server loaded!");

    var userModel    = require("./models/user.model.js")(db);
    var formModel   = require("./models/form.model.js")(uuid);
    var fieldModel   = require("./models/form.model.js")(uuid);

    require("./services/user.service.server.js") (app, userModel);
    require("./services/form.service.server.js") (app, formModel);
    require("./services/field.service.server.js") (app, fieldModel);

};

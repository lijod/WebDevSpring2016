"use strict";
module.exports = function(app, passport, db, userModel) {
    console.log("Project server loaded!");

    //var userModel = require("./model/user.model.js")(db);
    var reviewModel = require("./model/review.model.js")(db);
    var gadgetModel = require("./model/gadget.model.js")(db);

    require("./service/user.service.server.js") (app, userModel, gadgetModel, passport);
    require("./service/review.service.server.js") (app, reviewModel, gadgetModel);
    require("./service/gadget.service.server.js") (app, gadgetModel);

};
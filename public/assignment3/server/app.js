module.exports = function(app) {
    console.log("Assignment server loaded!");

    var userModel    = require("./models/user.model.server.js")();
    var formModel   = require("./models/form.model.server.js")();

    require("./services/user.service.server.js") (app, userModel);

};

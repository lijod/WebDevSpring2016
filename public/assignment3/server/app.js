module.exports = function(app) {
    console.log("Assignment server loaded!");

    var userModel    = require("./models/user.model.js")();
    //var formModel   = require("./models/form.model.js")();

    require("./services/user.service.server.js") (app, userModel);

};

var mongoose = require("mongoose");

module.exports = function () {
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        emails: [String],
        phones: [String],
        roles: [String],
        type: {type: String, default: "assignment"}
    }, {collection: 'user'});
    return UserSchema;
};
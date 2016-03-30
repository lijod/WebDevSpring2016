var mongoose = require("mongoose");

module.exports = function () {
    var FieldSchema = mongoose.Schema({
        label: String,
        type: String,
        placeholder: String,
        option: [{
            label: String,
            value: String
        } ]
    });
    return FieldSchema;
};
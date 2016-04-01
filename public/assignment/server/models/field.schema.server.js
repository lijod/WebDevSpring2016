var mongoose = require("mongoose");

module.exports = function () {
    var FieldSchema = mongoose.Schema({
        label: String,
        type: {type: String, enum: ["TEXT", "EMAIL", "PASSWORD", "TEXTAREA", "DATE", "OPTIONS", "CHECKBOXES", "RADIOS"]},
        placeholder: String,
        options: [{
            label: String,
            value: String
        }]
    });
    return FieldSchema;
};
"use strict";
var forms = require("./form.mock.json");

module.exports = function (uuid) {

    var api = {
        findAllFieldsForForm: findAllFieldsForForm,
        findFieldForForm: findFieldForForm,
        deleteFieldForForm: deleteFieldForForm,
        createFieldForForm: createFieldForForm,
        updateFieldForForm: updateFieldForForm,
        changeFieldIndexForForm: changeFieldIndexForForm
    };

    return api;

    function findAllFieldsForForm(formId) {
        for (var f in forms) {
            if (forms[f]._id == formId) {
                return forms[f].fields;
            }
        }
        return [];
    }

    function findFieldForForm(formId, fieldId) {
        var fields = findAllFieldsForForm(formId);
        for (var f in fields) {
            if (fields[f]._id == fieldId) {
                return fields[f];
            }
        }
        return null;
    }

    function deleteFieldForForm(formId, fieldId) {
        var fields = findAllFieldsForForm(formId);
        for (var f in fields) {
            if (fields[f]._id == fieldId) {
                var field = fields[f];
                fields.splice(f, 1);
                return field;
            }
        }
        return null;
    }

    function createFieldForForm(formId, field) {
        var fields = findAllFieldsForForm(formId);
        field._id = uuid.v4();
        fields.push(field);
        return field;
    }

    function updateFieldForForm(formId, fieldId, field) {
        var fields = findAllFieldsForForm(formId);
        var index = -1;
        for(var f in fields) {
            if(fields[f]._id == fieldId) {
                index = f;
                break;
            }
        }

        if(index > -1) {
            fields[index] = field;
            return field;
        }

        return null;
    }

    function changeFieldIndexForForm(formId, pos1, pos2) {
        var fields = findAllFieldsForForm(formId);
        var field = fields.splice(pos1, 1)[0];
        fields.splice(pos2, 0, field);
        return fields;
    }
}
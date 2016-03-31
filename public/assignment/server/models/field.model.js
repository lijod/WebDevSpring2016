"use strict";

module.exports = function (formModel) {

    var Form = formModel.getMongooseModel();

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
        return Form.findById(formId).select("fields");
    }

    function findFieldForForm(formId, fieldId) {
        return Form
            .findById(formId)
            .then(function(form) {
                return form.fields.id(fieldId);
            })
    }

    function deleteFieldForForm(formId, fieldId) {
        //var fields = findAllFieldsForForm(formId);
        //for (var f in fields) {
        //    if (fields[f]._id == fieldId) {
        //        var field = fields[f];
        //        fields.splice(f, 1);
        //        return field;
        //    }
        //}
        //return null;

        return Form.findById(formId)
            .then(function(form) {
                form.fields.id(fieldId).remove();
                return form.save();
            });
    }

    function createFieldForForm(formId, field) {
        //var fields = findAllFieldsForForm(formId);
        //field._id = uuid.v4();
        //fields.push(field);
        //return field;
        return Form.findById(formId)
            .then(
                function(form) {
                    form.fields.push(field);
                    return form.save();
                }
            );
    }

    function updateFieldForForm(formId, fieldId, newField) {
        return Form.findById(formId)
            .then(function(response) {
                var field = response.fields.id(fieldId);
                field.label = newField.label;
                field.type = newField.type;
                if(field.placeholder || field.placeholder == "") {
                    field.placeholder = newField.placeholder;
                }
                if(field.options) {
                    field.options = newField.options;
                }
                response.updated = Date.now();
                return response.save();
            });
    }

    function changeFieldIndexForForm(formId, pos1, pos2) {
        //var fields = findAllFieldsForForm(formId);
        //var field = fields.splice(pos1, 1)[0];
        //fields.splice(pos2, 0, field);
        //return fields;
        return Form.findById(formId)
            .then(
                function(form) {
                    form.fields.splice(pos2, 0, form.fields.splice(pos1, 1)[0]);
                    //// notify mongoose 'pages' field changed
                    //form.markModified("pages");
                    return form.save();
                })

    }
}
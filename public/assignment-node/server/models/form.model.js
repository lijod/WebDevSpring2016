var forms = require("./form.mock.json");

module.exports = function (uuid) {

    var api = {
        findFormByTitle: findFormByTitle,
        findAllForms: findAllForms,
        createForm: createForm,
        deleteFormById: deleteFormById,
        updateForm: updateForm,
        findFormByUserId: findFormByUserId,
        findFormById: findFormById,
        findFormByTitleForUser: findFormByTitleForUser,
        findAllFieldsForForm: findAllFieldsForForm,
        findFieldForForm: findFieldForForm,
        deleteFieldForForm: deleteFieldForForm,
        createFieldForForm: createFieldForForm,
        updateFieldForForm: updateFieldForForm,
        switchFieldIndexForForm: switchFieldIndexForForm
    };

    return api;

    function findFormById(formId) {
        for (var f in forms) {
            if (forms[f]._id == formId) {
                return forms[f];
            }
        }
        return null;
    }

    function findFormByTitle(title) {
        for (var f in forms) {
            if (forms[f].title === title) {
                return forms[f];
            }
        }
        return null;
    }

    function findFormByTitleForUser(userId, title) {
        for (var f in forms) {
            if (forms[f].title === title && forms[f].userId == userId) {
                return forms[f];
            }
        }
        return null;
    }

    function findAllForms() {
        return forms;
    }

    function createForm(userId, form) {
        form._id = uuid.v4();
        form.userId = userId;
        form.fields = [];
        forms.push(form);
        return form;
    }

    function deleteFormById(formId) {
        var index = -1;
        for (var f in forms) {
            if (forms[f]._id == formId) {
                index = f;
                break;
            }
        }

        if (index > -1) {
            var form = forms[index];
            forms.splice(index, 1);
            return form;
        }
        return null;
    }

    function updateForm(formId, form) {
        var index = -1;
        for (var f in forms) {
            if (forms[f]._id == formId) {
                index = f;
                break;
            }
        }

        if (index > -1) {
            forms[index] = form;
            return form;
        }

        return null;
    }

    function findFormByUserId(userId) {
        var formByUserId = forms.filter(function (form, index, arr) {
            return form.userId == userId;
        });

        return formByUserId;
    }

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

    function switchFieldIndexForForm(formId, pos1, pos2) {
        var fields = findAllFieldsForForm(formId);
        console.log(fields);
        var field = fields.splice(pos1, 1)[0];
        fields.splice(pos2, 0, field);
        console.log(fields);
        return fields;
    }
}
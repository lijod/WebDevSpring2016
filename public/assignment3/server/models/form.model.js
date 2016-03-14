var forms = require("./form.mock.json");

module.exports = function(uuid) {

    var api = {
        findFormByTitle: findFormByTitle,
        findAllForms: findAllForms,
        createForm: createForm,
        deleteFormById: deleteFormById,
        updateForm: updateForm,
        findFormByUserId: findFormByUserId,
        findFormById: findFormById,
        findFormByTitleForUser: findFormByTitleForUser
    };

    return api;

    function findFormById(formId) {
        for(var f in forms) {
            if( forms[f]._id == formId ) {
                return forms[f];
            }
        }
        return null;
    }

    function findFormByTitle(title) {
        for(var f in forms) {
            if( forms[f].title === title ) {
                return forms[f];
            }
        }
        return null;
    }

    function findFormByTitleForUser(userId, title) {
        for(var f in forms) {
            if( forms[f].title === title && forms[f].userId == userId) {
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
        forms.push(form);
        return form;
    }

    function deleteFormById(formId) {
        var index = -1;
        for(var f in forms) {
            if(forms[f]._id == formId) {
                index = f;
                break;
            }
        }

        if(index > -1) {
            var form = forms[index];
            forms.splice(index, 1);
            return form;
        }
        return null;
    }

    function updateForm(formId, form) {
        var index = -1;
        for(var f in forms) {
            if(forms[f]._id == formId) {
                index = f;
                break;
            }
        }

        if(index > -1) {
            forms[index] = form;
            return form;
        }

        return null;
    }

    function findFormByUserId(userId) {
        var formByUserId = forms.filter(function(form, index, arr) {
            return form.userId == userId;
        });

        return formByUserId;
    }


}
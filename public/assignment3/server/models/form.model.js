var forms = require("./form.mock.json");

module.exports = function() {

    var api = {
        findFormByTitle: findFormByTitle,
        findAllForms: findAllForms,
        createForm: createForm,
        deleteFormById: deleteFormById,
        updateForm: updateForm
    };

    return api;


    function findFormByTitle(title) {
        for(var f in forms) {
            if( forms[f].title === title ) {
                return forms[f];
            }
        }
        return null;
    }

    function findAllForms() {
        return forms;
    }

    function createForm(form) {
        form._id = "ID_" + (new Date()).getTime();
        forms.push(form);
        return form;
    }

    function deleteFormById(formId) {
        for(var f in forms) {
            if( forms[f]._id === formId ) {
                return forms[f];
            }
        }
        return null;
    }

    function updateForm(formId, form) {
        var index = -1;
        for(var f in forms) {
            if(forms[f]._id === formId) {
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


}
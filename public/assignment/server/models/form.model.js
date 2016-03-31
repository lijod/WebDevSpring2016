"use strict";

module.exports = function (db) {

    var FormSchema = require("./form.schema.server.js")();
    var FormModel = db.model("Form", FormSchema);

    var api = {
        findFormByTitle: findFormByTitle,
        findAllForms: findAllForms,
        createForm: createForm,
        deleteFormById: deleteFormById,
        updateForm: updateForm,
        findFormByUserId: findFormByUserId,
        findFormById: findFormById,
        findFormByTitleForUser: findFormByTitleForUser,
        getMongooseModel: getMongooseModel
    };

    return api;

    function findFormById(formId) {
        return FormModel.findById(formId);
    }

    function findFormByTitle(title) {
        return FormModel.findOne({title: title});
    }

    function findFormByTitleForUser(userId, title) {
        return FormModel.findOne({userId: userId, title: title});
    }

    function findAllForms() {
        return FormModel.find();
    }

    function createForm(userId, form) {
        form.userId = userId;
        form.fields = [];
        return FormModel.create(form);
    }

    function deleteFormById(formId) {
       return FormModel.remove({_id: formId});
    }

    function updateForm(formId, form) {
        delete form._id
        form.updated = Date.now();
        return FormModel.update(
            {_id: formId},
            {$set: form}
        );
    }

    function findFormByUserId(userId) {
       return FormModel.find({userId: userId});
    }

    function getMongooseModel() {
        return FormModel;
    }
}
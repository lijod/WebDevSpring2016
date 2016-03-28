"use strict";
module.exports = function(app, fieldModel) {
    app.get("/api/assignment/form/:formId/field", getFormsByUserId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldForForm);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldForForm);
    app.put("/api/assignment/form/:formId/field/:pos1/:pos2", changeFieldIndexForForm);

    function getFormsByUserId(req, res) {
        var formId = req.params.formId;
        res.json(fieldModel.findAllFieldsForForm(formId));
    }

    function getFieldForForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(fieldModel.findFieldForForm(formId, fieldId));
    }

    function deleteFieldForForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.deleteFieldForForm(formId, fieldId);
        res.json(fieldModel.findAllFieldsForForm(formId));
    }

    function createFieldForForm(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        fieldModel.createFieldForForm(formId, field);
        res.json(fieldModel.findAllFieldsForForm(formId));
    }

    function updateFieldForForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        fieldModel.updateFieldForForm(formId, fieldId, field);
        res.json(fieldModel.findAllFieldsForForm(formId));
    }

    function changeFieldIndexForForm(req, res) {
        var formId = req.params.formId;
        var pos1 = req.params.pos1;
        var pos2 = req.params.pos2;
        res.json(fieldModel.changeFieldIndexForForm(formId, pos1, pos2));
    }
}
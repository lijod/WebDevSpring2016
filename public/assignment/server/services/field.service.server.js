"use strict";
module.exports = function (app, fieldModel) {
    app.get("/api/assignment/form/:formId/field", getFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldForForm);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldForForm);
    app.put("/api/assignment/form/:formId/field/:pos1/:pos2", changeFieldIndexForForm);

    function getFieldsByFormId(req, res) {
        var formId = req.params.formId;
        fieldModel.findAllFieldsForForm(formId)
            .then(function (response) {
                    res.json(response.fields);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function getFieldForForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        //res.json(fieldModel.findFieldForForm(formId, fieldId));
        fieldModel.findFieldForForm(formId, fieldId)
            .then(function (response) {
                    res.json(response);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function deleteFieldForForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.deleteFieldForForm(formId, fieldId)
            .then(function (response) {
                    res.json(response.fields);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function createFieldForForm(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        fieldModel.createFieldForForm(formId, field)
            .then(function (response) {
                    res.json(response.fields);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function updateFieldForForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        fieldModel.updateFieldForForm(formId, fieldId, field)
            .then(function (response) {
                    return res.json(response.fields);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function changeFieldIndexForForm(req, res) {
        var formId = req.params.formId;
        var pos1 = req.params.pos1;
        var pos2 = req.params.pos2;
        fieldModel.changeFieldIndexForForm(formId, pos1, pos2)
            .then(function (response) {
                    res.json(response.fields);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }
}
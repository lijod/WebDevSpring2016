module.exports = function(app, formModel) {
    app.get("/api/assignment/form/:formId/field", getFormsByUserId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldForForm);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldForForm);

    function getFormsByUserId(req, res) {
        var formId = req.params.formId;
        res.json(formModel.findAllFieldsForForm(formId));
    }

    function getFieldForForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(formModel.findFieldForForm(formId, fieldId));
    }

    function deleteFieldForForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel.deleteFieldForForm(formId, fieldId);
        res.json(formModel.findAllFieldsForForm(formId));
    }

    function createFieldForForm(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        formModel.createFieldForForm(formId, field);
        res.json(formModel.findAllFieldsForForm(formId));
    }

    function updateFieldForForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        formModel.updateFieldForForm(formId, fieldId, field);
        res.json(formModel.findAllFieldsForForm(formId));
    }

}
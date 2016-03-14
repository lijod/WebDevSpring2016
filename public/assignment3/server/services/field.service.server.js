module.exports = function(app, formModel) {
    app.get("/api/assignment/form/:formId/field", getFormsByUserId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldForForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldForForm);
    app.post("/api/assignment/form/:formId/field", deleteFieldForForm);
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
        res.json(formModel.deleteFieldForForm(formId, fieldId));
    }

    function createFieldForForm(formId) {
        var formId = req.params.formId;
        var field = req.body;
        res.json(formModel.createFieldForForm(formId, fieldId));
    }

    function updateFieldForForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        res.json(formModel.updateFieldForForm(formId, fieldId, field));
    }

}
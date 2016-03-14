module.exports = function(app, formModel) {
    app.get("/api/assignment/user/:userId/form", getFormsByUserId);
    app.get("/api/assignment/form/:formId", getFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.put("/api/assignment/form/:formId", updateForm);


    function getFormsByUserId(req, res) {
        var userId = req.params.userId;
        res.json(formModel.findFormByUserId(userId));
    }

    function getFormById(req, res) {
        var formId = req.params.formId;
        res.json(formModel.findFormById(formId));
    }

    function createForm(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        formModel.createForm(userId, form);
        res.json(formModel.findFormByUserId(userId));
    }

    function updateForm(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        form = formModel.updateForm(formId, form);
        res.json(formModel.findFormByUserId(form.userId));
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        console.log(formId);
        var form = formModel.deleteFormById(formId);
        res.json(formModel.findFormByUserId(form.userId));
    }

}
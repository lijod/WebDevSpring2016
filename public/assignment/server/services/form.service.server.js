"use strict";
module.exports = function(app, formModel) {
    app.get("/api/assignment/user/:userId/form", getFormsByUserId);
    app.get("/api/assignment/form/:formId", getFormById);
    app.get("/api/assignment/user/:userId/formbytitle/:title", getFormByTitleForUser);
    app.delete("/api/assignment/user/:userId/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createForm);
    app.put("/api/assignment/form/:formId", updateForm);


    function getFormsByUserId(req, res) {
        var userId = req.params.userId;
        formModel.findFormByUserId(userId)
            .then(function(response) {
                res.json(response);
            },
            function(err) {
                res.status(400).send(err);
            });
    }

    function getFormById(req, res) {
        var formId = req.params.formId;
        formModel.findFormById(formId)
            .then(function(response) {
                res.json(response);
            },
            function(err) {
                res.status(400).send(err);
            });
    }

    function createForm(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        formModel.createForm(userId, form)
            .then(function(response) {
                return formModel.findFormByUserId(userId);
            },
            function(err) {
                res.status(400).send(err);
            })
            .then(function(response) {
                res.json(response);
            },
            function(err) {
                res.status(400).send(err);
            });
    }

    function updateForm(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        formModel.updateForm(formId, form)
            .then(function (response) {
                    return formModel.findFormByUserId(form.userId);
                },
                function (err) {
                    res.status(400).send(err);
                })
            .then(function (response) {
                    res.json(response);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        var userId = req.params.userId;
        formModel.deleteFormById(formId)
            .then(function(response) {
                return formModel.findFormByUserId(userId);
            },
            function(err) {
                res.status(400).send(err);
            })
            .then(function(response) {
                res.json(response);
            },
            function(err) {
                res.status(400).send(err);
            });
    }

    function getFormByTitleForUser(req, res) {
        var userId = req.params.userId;
        var title = req.params.title;
        formModel.findFormByTitleForUser(userId, title)
            .then(function(response) {
                res.json(response);
            },
            function(err) {
                res.status(400).send(err);
            });
    }
}
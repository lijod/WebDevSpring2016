"use strict";
module.exports = function(app, gadgetModel) {
    app.get("/api/gadgetguru/gadget/:gadgetId", findGadgetById);
    app.post("/api/gadgetguru/getallgadget", findAllGadget);
    app.post("/api/gadgetguru/gadget", addGadget);

    function findGadgetById(req, res) {
        var gadgetId = req.params.gadgetId;

        gadgetModel.findGadgetById(gadgetId)
            .then(function(response) {
               res.json(response);
            },
            function(err) {
                res.status(400).send(err);
            });
    }

    function findAllGadget(req, res) {
        var gadgetIdList = req.body;

        gadgetModel.findAllById(gadgetIdList)
            .then(function(response) {
                    res.json(response);
                },
                function(err) {
                    res.status(400).send(err);
                });
    }

    function addGadget(req, res) {
        var gadget = req.body;
        gadgetModel.addGadget(gadget)
            .then(function(response) {
                    res.json(response);
                },
                function(err) {
                    console.log(err);
                    res.status(400).send(err);
                });
    }

}
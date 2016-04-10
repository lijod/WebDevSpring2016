"use strict";
var q = require("q");
module.exports = function(app, reviewModel, gadgetModel) {

    app.get("/api/gadgetguru/review/gadget/:gadgetId", findAllReviewsForGadget);
    app.get("/api/gadgetguru/review/user/:userId", findAllReviewsForUser);
    app.post("/api/gadgetguru/review/user/:userId/gadget/:gadgetId", createReview);
    app.put("/api/gadgetguru/review/:reviewId", updateReview);
    app.delete("/api/gadgetguru/review/:reviewId", deleteReview);

    function findAllReviewsForGadget(req, res) {
        var gadgetId = req.params.gadgetId;
        reviewModel.findAllReviewsForGadget(gadgetId)
            .then(function(response) {
                res.json(response);
            },
            function(err) {
                res.status(400).send(err);
            });
    }

    function findAllReviewsForUser(req, res) {
        var userId = req.params.userId;
        reviewModel.findAllReviewsForUser(userId)
            .then(function(response) {
                    var promiseArray = [];
                    var result = [];
                    response.forEach(function(element, index) {
                        promiseArray.push(gadgetModel.findGadgetById(element.gadgetId)
                            .then(function(gadget){
                                var newObject = JSON.parse(JSON.stringify(element));
                                newObject.gadget = gadget;
                                result.push(newObject);
                            },
                            function(err) {
                                var newObject = JSON.parse(JSON.stringify(element));
                                newObject.gadget = {};
                                result.push(newObject);
                            }));
                    });

                    q.all(promiseArray).then(function() {
                        res.json(result);
                    });
                },
                function(err) {
                    res.status(400).send(err);
                });
    }

    function createReview(req, res) {
        var userId = req.params.userId;
        var gadgetId = req.params.gadgetId;
        var review = req.body;

        reviewModel.addReviewForUser(userId, gadgetId, review)
            .then(function(response) {
                res.json(response);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function updateReview(req, res) {
        var reviewId = req.params.reviewId;
        var review = req.body;

        reviewModel.updateReview(reviewId, review)
            .then(function(response) {
                res.json(response);
            },
            function(err) {
                res.status(400).send(err);
            });
    }

    function deleteReview(req, res) {
        var reviewId = req.params.reviewId;
        //var gadgetId = req.params.gadgetId;
        reviewModel.deleteReview(reviewId)
            .then(function(response) {
                res.json(response);
            },
            function(err) {
                res.status(400).send(err);
            });
    }

}
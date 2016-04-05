"use strict";
module.exports = function(app, reviewModel) {

    app.get("/api/gadgetguru/gadget/:gadgetId", findAllReviewsForGadget);
    app.post("/api/gadgetguru/user/:userId/gadget/:gadgetId", createReview);
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
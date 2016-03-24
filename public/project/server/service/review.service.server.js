"use strict";
module.exports = function(app, reviewModel) {

    app.get("/api/gadgetguru/gadget/:gadgetId", findAllReviewsForGadget);
    app.post("/api/gadgetguru/user/:userId/gadget/:gadgetId", createReview);
    app.put("/api/gadgetguru/review/:reviewId", updateReview);
    app.delete("/api/gadgetguru/gadget/:gadgetId/review/:reviewId", deleteReview);

    function findAllReviewsForGadget(req, res) {
        var gadgetId = req.params.gadgetId;
        res.json(reviewModel.findAllReviewsForGadget(gadgetId));
    }

    function createReview(req, res) {
        var userId = req.params.userId;
        var gadgetId = req.params.gadgetId;
        var review = req.body;

        reviewModel.addReviewForUser(userId, gadgetId, review);
        res.json(reviewModel.findAllReviewsForGadget(gadgetId));
    }

    function updateReview(req, res) {
        var reviewId = req.params.reviewId;
        var review = req.body;

        res.json(reviewModel.updateReview(reviewId, review));
    }

    function deleteReview(req, res) {
        var reviewId = req.params.reviewId;
        var gadgetId = req.params.gadgetId;
        reviewModel.deleteReview(reviewId);
        res.json(reviewModel.findAllReviewsForGadget(gadgetId));
    }

}
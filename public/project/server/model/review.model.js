"use strict";
module.exports = function(db) {

    var ReviewSchema = require("./review.schema.server.js")(db);
    var ReviewModel = db.model("GG_Review", ReviewSchema);

    var api = {
        findAllReviewsForGadget: findAllReviewsForGadget,
        addReviewForUser: addReviewForUser,
        updateReview: updateReview,
        deleteReview: deleteReview
    };

    return api;

    function findAllReviewsForGadget(gadgetId) {
        return ReviewModel.find({gadgetId: gadgetId});
    }

    function addReviewForUser(userId, gadgetId, review) {
        review.userId = userId;
        review.gadgetId = gadgetId;
        return ReviewModel.create(review);
    }

    function updateReview(reviewId, review) {
        delete review._id;
        return ReviewModel.update(
            {_id: reviewId},
            {$set: review});
    }

    function deleteReview(reviewId) {
        return ReviewModel.remove({_id: reviewId});
    }
}
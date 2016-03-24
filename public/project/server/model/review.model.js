"use strict";
var reviews = require("./review.mock.json");

module.exports = function(uuid) {

    var api = {
        findAllReviewsForGadget: findAllReviewsForGadget,
        addReviewForUser: addReviewForUser,
        updateReview: updateReview,
        deleteReview: deleteReview
    };

    return api;

    function findAllReviewsForGadget(gadgetId) {
        var toReturn = reviews.filter(function(review, index, arr){
            return (review.gadgetId == gadgetId);
        });
        return toReturn;
    }

    function addReviewForUser(userId, productId, review) {
        review._id = uuid.v4();
        review.userId = userId;
        review.gadgetId = productId;

        reviews.push(review);

        return findAllReviewsForGadget(productId);
    }

    function updateReview(reviewId, review) {
        var index = getIndexByReviewId(reviewId);
        reviews[index] = review;
        return reviews[index];
    }

    function getIndexByReviewId(reviewId) {
        for(var index in reviews) {
            if(reviews[index]._id == reviewId) {
                return index;
            }
        }
    }

    function deleteReview(reviewId) {
        var index = getIndexByReviewId(reviewId);
        var deleted = reviews.splice(index, 1);
        return deleted;
    }
}
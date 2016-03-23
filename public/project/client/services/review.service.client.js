"use strict";
(function() {

    angular
        .module("GadgetGuruApp")
        .factory("ReviewService", ReviewService);

    function ReviewService() {

        var reviews = [
            {   "_id": 1,
                "userId" : 234,
                "title": "This is a test title 1",
                "review" : "This is a test review for macbook pro. Product ID: 1219696697139",
                "rating": 4,
                "gadgetId" : "1219696697139"},

            {   "_id": 2,
                "userId" : 345,
                "title": "This is a test title 2",
                "review" : "This is a test review for macbook pro. Product ID: 1219696697139",
                "rating": 3,
                "gadgetId" : "1219696697139"}
        ];

        var api = {
            findAllReviewsForGadget: findAllReviewsForGadget,
            addReviewForUser: addReviewForUser,
            updateReview: updateReview,
            deleteReview: deleteReview
        };

        return api;

        function findAllReviewsForGadget(gadgetId) {
            var toReturn = reviews.filter(function(review, index, arr){
                return (review.gadgetId === gadgetId);
            });
            return toReturn;
        }

        function addReviewForUser(userId, productId, review) {
            var id = (new Date).getTime();
            var currReview = {
                "_id": id,
                "userId": userId,
                "gadgetId": productId,
                "title": review.title,
                "review": review.review,
                "rating": review.rating
            };

            reviews.push(currReview);

            return findAllReviewsForGadget(productId);
        }

        function updateReview(reviewId, review) {
            var index = getIndexByReviewId(reviewId);
            reviews[index].title = review.title;
            reviews[index].review = review.review;
            reviews[index].rating = review.rating;
            return reviews[index];
        }

        function getIndexByReviewId(reviewId) {
            for(var index in reviews) {
                if(reviews[index]._id === reviewId) {
                    return index;
                }
            }
        }

        function deleteReview(reviewId, review, productId) {
            var index = getIndexByReviewId(reviewId);
            reviews.splice(index, 1);
            return findAllReviewsForGadget(productId);
        }
    }

})();
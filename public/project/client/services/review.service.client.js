"use strict";
(function() {

    angular
        .module("GadgetGuruApp")
        .factory("ReviewService", ReviewService);

    function ReviewService($http) {

        var api = {
            findAllReviewsForGadget: findAllReviewsForGadget,
            addReviewForUser: addReviewForUser,
            updateReview: updateReview,
            deleteReview: deleteReview
        };

        return api;

        function findAllReviewsForGadget(gadgetId) {
            return $http.get("/api/gadgetguru/gadget/" + gadgetId);
        }

        function addReviewForUser(userId, gadgetId, review) {
            return $http.post("/api/gadgetguru/user/" + userId + "/gadget/" + gadgetId, review);
        }

        function updateReview(reviewId, review) {
            return $http.put("/api/gadgetguru/review/" + reviewId, review);
        }

        //function getIndexByReviewId(reviewId) {
        //    for(var index in reviews) {
        //        if(reviews[index]._id === reviewId) {
        //            return index;
        //        }
        //    }
        //}

        function deleteReview(reviewId) {
            return $http.delete("/api/gadgetguru/review/" + reviewId);
        }
    }

})();
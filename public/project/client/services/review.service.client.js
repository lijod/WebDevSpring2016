"use strict";
(function() {

    angular
        .module("GadgetGuruApp")
        .factory("ReviewService", ReviewService);

    function ReviewService($http) {

        var api = {
            findAllReviewsForGadget: findAllReviewsForGadget,
            findAllReviewsForUser: findAllReviewsForUser,
            addReviewForUser: addReviewForUser,
            updateReview: updateReview,
            deleteReview: deleteReview
        };

        return api;

        function findAllReviewsForGadget(gadgetId) {
            return $http.get("/api/gadgetguru/review/gadget/" + gadgetId);
        }

        function findAllReviewsForUser(userId) {
            return $http.get("/api/gadgetguru/review/user/" + userId);
        }

        function addReviewForUser(userId, gadgetId, review) {
            return $http.post("/api/gadgetguru/review/user/" + userId + "/gadget/" + gadgetId, review);
        }

        function updateReview(reviewId, review) {
            return $http.put("/api/gadgetguru/review/" + reviewId, review);
        }

        function deleteReview(reviewId) {
            return $http.delete("/api/gadgetguru/review/" + reviewId);
        }
    }

})();
"use strict";
(function() {

    angular
        .module("GadgetGuruApp")
        .factory("ReviewService", ReviewService);

    function ReviewService() {

        var reviews = [
            {"userId" : 234,
                "title": "This is a test title 1",
                "review" : "This is a test review for macbook pro. Product ID: 1219696697139",
                "rating": 4,
                "gadgetId" : "1219696697139"},

            {"userId" : 345,
                "title": "This is a test title 2",
                "review" : "This is a test review for macbook pro. Product ID: 1219696697139",
                "rating": 4,
                "gadgetId" : "1219696697139"}
        ];

        var api = {
            findAllReviewsForGadget: findAllReviewsForGadget
        };

        return api;


        function findAllReviewsForGadget(gadgetId){
            var toReturn = reviews.filter(function(review, index, arr){
                return (review.gadgetId === gadgetId);
            });
            return toReturn;
        }


    }

})();
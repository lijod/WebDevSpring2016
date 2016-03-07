"use strict";
(function() {

    angular
        .module("GadgetGuruApp")
        .factory("ReviewService", ReviewService);

    function ReviewService() {

        var reviews = [
            {"userId" : 234,
                "review" : "This is a test review for macbook pro. Product ID: 1219696697139",
                rating: 4,
                "gadgetId" : 1219696697139},

            {"userId" : 345,
                "review" : "This is a test review for macbook pro. Product ID: 1219696697139",
                rating: 4,
                "gadgetId" : 1219696697139}
        ];

        var api = {

        };

        return api;
    }

})();
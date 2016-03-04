"use strict";
(function() {

    angular
        .module("GadgetGuruApp")
        .factory("SearchService", SearchService);

    function SearchService($http){
        var url = "http://api.bestbuy.com/v1/products(name=(KEYWORD)*&type!=Music&type!=Movie&type!=BlackTie&type!=Software)?format=json&apiKey=762v7pj4r2xqka9nnhetu5gn"

        var api = {
            getGadgetsByKeyword: getGadgetsByKeyword
        };

        return api;

        function getGadgetsByKeyword(keyword){
            var searchURL = url.replace("(KEYWORD)", keyword);
            return $http.get(searchURL);
        }
    }

})();
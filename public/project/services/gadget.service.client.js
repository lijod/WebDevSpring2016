"use strict";
(function() {

    angular
        .module("GadgetGuruApp")
        .factory("GadgetService", GadgetService);

    function GadgetService($http){

        var api = {
            getGadgetsByKeyword: getGadgetsByKeyword,
            getGadgetDetail: getGadgetDetail
        };

        return api;

        function getGadgetsByKeyword(keyword){
            var url = "http://api.bestbuy.com/v1/products(name=(KEYWORD)*&type!=Music&type!=Movie&type!=BlackTie&type!=Software)?format=json&apiKey=762v7pj4r2xqka9nnhetu5gn"
            var searchURL = url.replace("(KEYWORD)", keyword);
            return $http.get(searchURL);
        }

        function getGadgetDetail(productId){
            var url = "http://api.bestbuy.com/v1/products(productId=" + productId + ")?format=json&apiKey=762v7pj4r2xqka9nnhetu5gn"
            console.log(url);
            return $http.get(url);
        }
    }

})();
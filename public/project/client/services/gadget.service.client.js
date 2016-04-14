"use strict";
(function () {

    angular
        .module("GadgetGuruApp")
        .factory("GadgetService", GadgetService);

    function GadgetService($http) {

        var categoryCallParam = {
            "mobile": "categoryPath.name=Cell%20Phones&categoryPath.id!=abcat0811006&categoryPath.id!=abcat0811002",
            "laptop": "categoryPath.id=abcat0502000&type!=BlackTie",
            "appliances": "(categoryPath.id=abcat0903000|categoryPath.id=abcat0901000|categoryPath.id=abcat0910001)&type!=BlackTie",
            "games": "(categoryPath.id=abcat0700000)&type!=BlackTie",
            "software": "(categoryPath.id=abcat0508000)&type!=BlackTie",
            "audio": "(categoryPath.id=abcat0200000)&type!=BlackTie",
            "camera": "(categoryPath.id=abcat0401005)&type!=BlackTie",
            "tv": "(categoryPath.id=abcat0101000)&type!=BlackTie",
            "fitness": "(categoryPath.id=pcmcat242800050021)&type!=BlackTie"
        };

        var api = {
            getGadgetsByKeyword: getGadgetsByKeyword,
            getGadgetDetail: getGadgetDetail,
            getGadgetsByCategory: getGadgetsByCategory,
            addGadget: addGadget,
            findAllGadget: findAllGadget
        };

        return api;

        function getGadgetsByKeyword(keyword, currentPage, itemsPerpage) {
            keyword = encodeURIComponent(keyword);
            var url = "http://api.bestbuy.com/v1/products(search=(KEYWORD)&type!=Music" +
                "&type!=Movie&type!=BlackTie&type!=Software)?" +
                "page=" + currentPage + "&pageSize=" + itemsPerpage + "&format=json&apiKey=762v7pj4r2xqka9nnhetu5gn";
            var searchURL = url.replace("(KEYWORD)", keyword);
            return $http.get(searchURL);
        }

        function getGadgetsByCategory(category, currentPage, itemsPerpage) {
            var url = "http://api.bestbuy.com/v1/products(" + categoryCallParam[category] +
                ")?" +
                "page=" + currentPage + "&pageSize=" + itemsPerpage + "&format=json&apiKey=762v7pj4r2xqka9nnhetu5gn";
            return $http.get(url);
        }

        function getGadgetDetail(gadgetId) {
            var fields = "productId,name,active,regularPrice,salePrice,frequentlyPurchasedWith," +
                "relatedProducts,url,mobileUrl,categoryPath,customerReviewAverage,shortDescription," +
                "manufacturer,modelNumber,image,largeFrontImage,mediumImage,thumbnailImage,largeImage," +
                "alternateViewsImage,longDescription,features,details";
            var url = "http://api.bestbuy.com/v1/products(productId=" + gadgetId + ")?format=json&apiKey=762v7pj4r2xqka9nnhetu5gn&show=" + fields;
            console.log(url);
            return $http.get(url);
        }

        function addGadget(gadget) {
            return $http.post("/api/gadgetguru/gadget", gadget);
        }

        function findAllGadget(gadgetIdList) {
            return $http.post("/api/gadgetguru/getallgadget", gadgetIdList);
        }
    }

})();
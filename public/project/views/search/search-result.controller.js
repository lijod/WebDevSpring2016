(function() {

    angular
        .module("GadgetGuruApp")
        .controller("SearchResultController", SearchResultController);

    function SearchResultController($http, $scope, $stateParams) {
        console.log("SearchResultController");
        $scope.gadget = {};
        var url = "http://api.bestbuy.com/v1/products(productId=" + $stateParams.productId + ")?format=json&apiKey=762v7pj4r2xqka9nnhetu5gn"
        console.log(url);

        $http.get(url)
            .success(function (response) {
                console.log(response);
                $scope.gadget = response.products[0];
                //deferred.resolve(response);
            })
            .error(function(error){
                console.log("error inside searchservice searchevent from http get ---" + error);
                //deferred.reject(error);
            })
            .finally(function () {
                console.log("inside finally for first api call");
            });

    }

})();
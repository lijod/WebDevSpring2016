(function() {

    angular
        .module("bestbuy",[])
        .controller("SearchController", SearchController);

    function SearchController($http, $scope){
        console.log("SearchController");

        var url = "http://api.bestbuy.com/v1/products(name=(KEYWORD)*&type!=Music&type!=Movie&type!=BlackTie&type!=Software)?format=json&apiKey=762v7pj4r2xqka9nnhetu5gn"
        $scope.gadgets = [];
        $scope.search = search;
        function search(keyword){
            console.log("Keyword:" + keyword);
            searchURL = url.replace("(KEYWORD)", keyword);
            $http.get(searchURL)
                .success(function (response) {
                    console.log(response);
                    $scope.gadgets = response.products;
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

    }


})();
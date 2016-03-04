(function() {

    angular
        .module("GadgetGuruApp")
        .controller("SearchController", SearchController);

    function SearchController($http, $scope, SearchService){
        console.log("SearchController");
        var vm = this;
        vm.search = search;
        function init() {
            vm.gadgets = [];
        }
        init();

        function search(keyword){
            console.log("Keyword:" + keyword);
            SearchService
                .getGadgetsByKeyword(keyword)
                .then(function(response) {
                    console.log("response");
                    console.log(response);
                        vm.gadgets = response.data.products;
                },
                function(){
                    console.log("Error occurred while getting result from API");
                    vm.gadgets = [];
                });
        }
    }
})();
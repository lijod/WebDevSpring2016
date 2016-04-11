(function () {

    angular
        .module("GadgetGuruApp")
        .controller("SearchResultController", SearchResultController);

    function SearchResultController($scope, $stateParams, GadgetService) {
        console.log("SearchResultController");
        var vm = this;
        //vm.search = search;
        function init() {
            var keyword = $stateParams.keyword;
            var isCategory = $stateParams.isCategory;
            $scope.searchModel.updateGadgetName(keyword);

            search(keyword, isCategory);
            vm.gadgets = [];
        }

        init();

        function search(keyword, isCategory) {
            console.log("Keyword:" + keyword);
            isCategory = isCategory ? isCategory.toLowerCase() : "false";
            console.log("isCategory:" + isCategory);
            if (isCategory == 'true') {
                GadgetService
                    .getGadgetsByCategory(keyword)
                    .then(function (response) {
                            console.log(response);
                            vm.gadgets = response.data.products;
                        },
                        function () {
                            console.log("Error occurred while getting result from API");
                            vm.gadgets = [];
                        });
            } else {
                GadgetService
                    .getGadgetsByKeyword(keyword)
                    .then(function (response) {
                            console.log(response);
                            vm.gadgets = response.data.products;
                        },
                        function () {
                            console.log("Error occurred while getting result from API");
                            vm.gadgets = [];
                        });
            }
        }
    }
})();
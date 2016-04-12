(function () {

    angular
        .module("GadgetGuruApp")
        .controller("SearchResultController", SearchResultController);

    function SearchResultController($scope, $stateParams, GadgetService) {
        console.log("SearchResultController");
        var vm = this;
        //vm.search = search;

        vm.totalItems = 1;
        vm.currentPage = 1;
        vm.maxPaginationSize = 10;
        vm.itemsPerPage = 15;


        function init() {
            vm.gadgets = [];
            vm.keyword = $stateParams.keyword;
            vm.isCategory = $stateParams.isCategory;

            if(vm.isCategory != 'true') {
                $scope.searchModel.updateGadgetName(vm.keyword);
            } else {
                $scope.searchModel.updateGadgetName("");
            }

            vm.search = search;
            vm.search();
        }

        init();

        vm.pageChanged = function() {
            console.log('Page changed to: ' + vm.currentPage);
        };

        function search() {
            console.log("Keyword:" + vm.keyword);
            vm.isCategory = vm.isCategory ? vm.isCategory.toLowerCase() : "false";
            console.log("isCategory:" + vm.isCategory);
            if (vm.isCategory == 'true') {
                GadgetService
                    .getGadgetsByCategory(vm.keyword, vm.currentPage, vm.itemsPerPage)
                    .then(function (response) {
                            console.log(response);
                            vm.gadgets = response.data.products;
                            vm.totalItems = response.data.total;
                        },
                        function () {
                            console.log("Error occurred while getting result from API");
                            vm.gadgets = [];
                        });
            } else {
                GadgetService
                    .getGadgetsByKeyword(vm.keyword, vm.currentPage, vm.itemsPerPage)
                    .then(function (response) {
                            console.log(response);
                            vm.gadgets = response.data.products;
                            vm.totalItems = response.data.total;
                        },
                        function () {
                            console.log("Error occurred while getting result from API");
                            vm.gadgets = [];
                        });
            }
        }
    }
})();
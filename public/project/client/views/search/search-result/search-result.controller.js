(function () {

    angular
        .module("GadgetGuruApp")
        .controller("SearchResultController", SearchResultController);

    function SearchResultController($scope, $stateParams, GadgetService) {
        console.log("SearchResultController");
        var vm = this;
        //vm.search = search;

        function init() {
            vm.totalItems = 1;
            vm.currentPage = 1;
            vm.maxPaginationSize = 3;
            vm.itemsPerPage = 15;
            vm.gadgets = [];
            vm.keyword = $stateParams.keyword;
            vm.isCategory = $stateParams.isCategory;
            vm.loading = false;
            vm.hasNoResult = false;

            if(vm.isCategory != 'true') {
                $scope.searchModel.updateGadgetName(vm.keyword);
            } else {
                $scope.searchModel.updateGadgetName("");
            }

            vm.search = search;
            vm.search();
        }

        init();

        function search() {
            console.log("Keyword:" + vm.keyword);
            vm.isCategory = vm.isCategory ? vm.isCategory.toLowerCase() : "false";
            console.log("isCategory:" + vm.isCategory);
            vm.loading=true;
            vm.gadgets = [];
            if (vm.isCategory == 'true') {
                GadgetService
                    .getGadgetsByCategory(vm.keyword, vm.currentPage, vm.itemsPerPage)
                    .then(function (response) {
                            console.log(response);
                            vm.gadgets = response.data.products;
                            vm.totalItems = response.data.total;
                            vm.loading = false;
                            vm.hasNoResult = (vm.gadgets.length == 0);
                        },
                        function () {
                            console.log("Error occurred while getting result from API");
                            vm.gadgets = [];
                            vm.loading = false;
                            vm.hasNoResult = true;
                        });
            } else {
                GadgetService
                    .getGadgetsByKeyword(vm.keyword, vm.currentPage, vm.itemsPerPage)
                    .then(function (response) {
                            console.log(response);
                            vm.gadgets = response.data.products;
                            vm.totalItems = response.data.total;
                            vm.loading = false;
                            vm.hasNoResult = (vm.gadgets.length == 0);
                        },
                        function () {
                            console.log("Error occurred while getting result from API");
                            vm.gadgets = [];
                            vm.loading = false;
                            vm.hasNoResult = true;
                        });
            }
        }
    }
})();
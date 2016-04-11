(function() {

    angular
        .module("GadgetGuruApp")
        .controller("SearchController", SearchController);

    function SearchController($http, $scope, GadgetService){
        console.log("SearchController");
        var vm = this;
        vm.updateGadgetName = updateGadgetName;

        function updateGadgetName(gadgetName) {
            vm.gadgetName = gadgetName;
        }
    }
})();
(function() {

    angular
        .module("GadgetGuruApp")
        .controller("SearchController", SearchController);

    function SearchController($state){
        console.log("SearchController");
        var vm = this;
        vm.updateGadgetName = updateGadgetName;
        vm.search = search;

        function updateGadgetName(gadgetName) {
            vm.gadgetName = gadgetName;
        }

        function search(event, keyword) {
            if (event.keyCode === 13) {
                $state.go("home.result", {keyword: keyword, isCategory: false});
            }
        }
    }
})();
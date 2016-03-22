(function() {

    angular
        .module("GadgetGuruApp")
        .controller("SearchResultController", SearchResultController);

    function SearchResultController($stateParams, GadgetService) {
        console.log("SearchResultController");

        var vm = this;
        vm.gadget = {};
        function init() {
            var productId = $stateParams.productId;
            console.log("productId:", productId);
            if(productId && productId.trim() !== "") {
                GadgetService.getGadgetDetail(productId)
                    .then(function (response) {
                        console.log(response);
                        vm.gadget = response.data.products[0];
                        //deferred.resolve(response);
                    }, function () {
                        console.log("Error while getting details for product: " + productId);
                        //deferred.reject(error);
                    });
            } else {
                vm.gadget = {};
            }
        }

        init();
    }
})();
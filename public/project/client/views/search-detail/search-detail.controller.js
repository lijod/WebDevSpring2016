(function() {

    angular
        .module("GadgetGuruApp")
        .controller("SearchResultController", SearchResultController);

    function SearchResultController($state, $stateParams, GadgetService, UserService) {
        console.log("SearchResultController");

        var vm = this;
        vm.gadget = {};
        function init() {
            vm.gadgetId = $stateParams.gadgetId;
            vm.isLiked = false;
            console.log("gadgetId:", vm.gadgetId);
            if(vm.gadgetId && vm.gadgetId.trim() !== "") {
                GadgetService.getGadgetDetail(vm.gadgetId)
                    .then(function (response) {
                        console.log(response);
                        vm.gadget = response.data.products[0];
                    }, function (err) {
                        console.log("Error while getting details for product: " + vm.gadgetId);
                        console.log(err);
                    });
                UserService.getCurrentUser()
                    .then(function(response) {
                        vm.user = response.data;
                        UserService.isLikedGadget(vm.user._id, vm.gadgetId)
                            .then(function(response) {
                                console.log(response.data.isLiked);
                                vm.isLiked = response.data.isLiked;
                            },
                            function(err) {
                                console.log(err);
                            });

                    },
                    function(err) {
                        console.log(err);
                    });
            } else {
                vm.gadget = {};
                $state.go("home");
            }
            vm.likeGadget = likeGadget;
            vm.undoLikeGadget = undoLikeGadget;
        }

        init();

        function likeGadget() {
            UserService.addLikedGadget(vm.user._id, vm.gadgetId)
                .then(function(response) {
                    response = response.data;
                    console.log(response);
                    if(response.ok && response.ok === 1 && response.nModified && response.nModified === 1) {
                        vm.isLiked = true;
                    }
                },
                function(err) {
                    console.log(err);
                });
        }

        function undoLikeGadget() {
            UserService.undoLikedGadget(vm.user._id, vm.gadgetId)
                .then(function(response) {
                    response = response.data;
                    console.log(response);
                    if(response.ok && response.ok === 1 && response.nModified && response.nModified === 1) {
                        vm.isLiked = false;
                    }
                },
                function(err) {
                    console.log(err);
                });
        }

    }
})();
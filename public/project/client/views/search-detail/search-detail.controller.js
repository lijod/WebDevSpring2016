(function () {

    angular
        .module("GadgetGuruApp")
        .controller("SearchDetailController", SearchDetailController);

    function SearchDetailController($state, $scope, $stateParams, GadgetService, UserService) {
        console.log("SearchDetailController");

        var vm = this;
        vm.gadget = {};
        function init() {
            //$scope.$on('$stateChangeSuccess', function () {
            //    document.body.scrollTop = 0;
            //    document.documentElement.scrollTop = 0;
            //});
            vm.gadgetId = $stateParams.gadgetId;
            vm.isLiked = false;
            console.log("gadgetId:", vm.gadgetId);
            if (vm.gadgetId && vm.gadgetId.trim() !== "") {
                GadgetService.getGadgetDetail(vm.gadgetId)
                    .then(function (response) {
                        console.log(response);
                        vm.gadget = response.data.products[0];
                    }, function (err) {
                        console.log("Error while getting details for product: " + vm.gadgetId);
                        console.log(err);
                    });
                UserService.getCurrentUser()
                    .then(function (response) {
                            vm.user = response.data;
                            console.log(vm.user);
                            if (vm.user) {
                                UserService.isLikedGadget(vm.user._id, vm.gadgetId)
                                    .then(function (response) {
                                            console.log(response.data.isLiked);
                                            vm.isLiked = response.data.isLiked;
                                        },
                                        function (err) {
                                            console.log(err);
                                        });
                            }
                        },
                        function (err) {
                            console.log(err);
                        });
            } else {
                vm.gadget = {};
                $state.go("home");
            }
            vm.likeGadget = likeGadget;
            vm.undoLikeGadget = undoLikeGadget;
            vm.updateRating = updateRating;
        }

        init();

        function likeGadget() {
            var gadgetToAdd = {
                _id: vm.gadgetId,
                title: vm.gadget.name,
                imgUrl: vm.gadget.image
            };
            UserService.addLikedGadget(vm.user._id, vm.gadgetId)
                .then(function (response) {
                        response = response.data;
                        if (response.ok && response.ok === 1 && response.n && response.n === 1) {
                            vm.isLiked = true;
                            return GadgetService.addGadget(gadgetToAdd);
                        }
                    },
                    function (err) {
                        console.log(err);
                    })
                .then(function (response) {
                        //console.log(response.data);
                    },
                    function (err) {
                        console.log("likeGadget->addLikedGadget->addGadget");
                    });
        }

        function undoLikeGadget() {
            UserService.undoLikedGadget(vm.user._id, vm.gadgetId)
                .then(function (response) {
                        response = response.data;
                        console.log(response);
                        if (response.ok && response.ok === 1 && response.n && response.n === 1) {
                            vm.isLiked = false;
                        }
                    },
                    function (err) {
                        console.log(err);
                    });
        }

        function updateRating(rating) {
            console.log("update", rating)
            vm.avgRating = rating;
        }
    }
})();
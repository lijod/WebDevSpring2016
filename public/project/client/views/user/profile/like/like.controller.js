(function() {

    angular
        .module("GadgetGuruApp")
        .controller("ProfileLikeController", ProfileLikeController);

    function ProfileLikeController($stateParams, UserService) {
        var vm = this;

        function init() {
            var userId = $stateParams.userId;

            UserService.getCurrentUser()
                .then(function (response) {
                        vm.currUser = response.data;
                        return UserService.findUserByUserId(vm.currUser._id);
                    },
                    function () {
                        console.log("FollowerController->getCurrentUser");
                    })
                .then(function (response) {
                        vm.currUser = response.data;
                        return UserService.findLikedGadgets(userId);
                    },
                    function () {
                        console.log("FollowerController->findUserByUserId");
                    })
                .then(function(response) {
                        var likedGadgets = response.data;
                        likedGadgets.forEach(function(element, index) {
                           element.isLiked = vm.currUser.likedGadget.indexOf(element._id) > -1;
                        });
                    console.log(likedGadgets);
                        vm.likedGadgets = likedGadgets;
                    },
                    function(err) {
                        console.log("ProfileLikeController->init->findLikedGadgets");
                    });

            vm.likeGadget = likeGadget;
            vm.undoLikeGadget = undoLikeGadget;
        }

        init();

        function likeGadget(gadget) {
            UserService.addLikedGadget(vm.currUser._id, gadget._id)
                .then(function (response) {
                        response = response.data;
                        if (response.ok && response.ok === 1 && response.nModified && response.nModified === 1) {
                            gadget.isLiked = true;
                        }
                    },
                    function (err) {
                        console.log(err);
                    });
        }

        function undoLikeGadget(gadget) {
            UserService.undoLikedGadget(vm.currUser._id, gadget._id)
                .then(function (response) {
                        response = response.data;
                        console.log(response);
                        if (response.ok && response.ok === 1 && response.nModified && response.nModified === 1) {
                            gadget.isLiked = false;
                        }
                    },
                    function (err) {
                        console.log(err);
                    });
        }
    }

})();
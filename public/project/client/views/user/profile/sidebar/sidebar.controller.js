(function () {

    angular
        .module("GadgetGuruApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($state, $stateParams, UserService) {
        var vm = this;

        function init() {
            vm.state = $state;
            vm.isFollowing = false;
            vm.follow = follow;
            vm.unfollow = unfollow;

            var userId = $stateParams.userId;
            UserService.getCurrentUser()
                .then(function (response) {
                        vm.loggedInUser = response.data;
                        if(userId !== vm.loggedInUser._id) {
                            return UserService.findUserByUserId(userId);
                        } else {
                            vm.paramUser = vm.loggedInUser;
                        }
                    },
                    function (err) {
                        console.log("ProfileController->getCurrentUser");
                        console.log(err);
                    })
                .then(function (response) {
                        if(!response) {
                            return;
                        }
                        vm.paramUser = response.data;
                        UserService.isFollowing(vm.loggedInUser._id, vm.paramUser._id)
                            .then(function (response) {
                                    vm.isFollowing = response.data.isFollowing;
                                },
                                function (err) {
                                    console.log(err);
                                });
                    },
                    function (err) {
                        console.log("ProfileController->findUserByUserId");
                        console.log(err);
                    });
        }

        init();

        function follow() {
            UserService.follow(vm.loggedInUser._id, vm.paramUser._id)
                .then(function (response) {
                        response = response.data;
                        if (response && response.ok && response.ok === 1 && response.nModified && response.nModified === 1) {
                            vm.isFollowing = true;
                        }
                    },
                    function (err) {
                        console.log(err);
                    });
        }

        function unfollow() {
            UserService.unfollow(vm.loggedInUser._id, vm.paramUser._id)
                .then(function (response) {
                        response = response.data;
                        if (response && response.ok && response.ok === 1 && response.nModified && response.nModified === 1) {
                            vm.isFollowing = false;
                        }
                    },
                    function (err) {
                        console.log(err);
                    });
        }

    }
})();
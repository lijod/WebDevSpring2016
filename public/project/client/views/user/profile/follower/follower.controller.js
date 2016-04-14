(function() {

    angular
        .module("GadgetGuruApp")
        .controller("FollowerController", FollowerController);

    function FollowerController($stateParams, UserService) {
        var vm = this;

        function init() {
            vm.paramUserId = $stateParams.userId;
            vm.loading = true;
            UserService.getCurrentUser()
                .then(function (response) {
                        vm.currUser = response.data;
                        return UserService.findFollowerUsers(vm.paramUserId);
                    },
                    function () {
                        console.log("FollowerController->getCurrentUser");
                        vm.loading = false;
                    })
                .then(function(response) {
                        var followers = response.data;
                        followers.forEach(function(element, index) {
                            element.isFollowing = element.follower.indexOf(vm.currUser._id) > -1;
                        });
                        vm.follower = followers;
                        vm.loading = false;
                    },
                    function(err) {
                        console.log("FollowerController->init->findFollowingUsers");
                        vm.loading = false;
                    });

            vm.follow = follow;
            vm.unfollow = unfollow;
        }

        init();


        function follow(toFollowUser) {
            UserService.follow(vm.currUser._id, toFollowUser._id)
                .then(function (response) {
                        response = response.data;
                        if (response && response.ok && response.ok === 1 && response.n && response.n === 1) {
                            toFollowUser.isFollowing = true;
                        }
                    },
                    function (err) {
                        console.log(err);
                    });
        }

        function unfollow(toUnfollowUser) {
            UserService.unfollow(vm.currUser._id, toUnfollowUser._id)
                .then(function (response) {
                        response = response.data;
                        if (response && response.ok && response.ok === 1 && response.n && response.n === 1) {
                            toUnfollowUser.isFollowing = false;
                        }
                    },
                    function (err) {
                        console.log(err);
                    });
        }
    }

})();
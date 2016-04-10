(function() {

    angular
        .module("GadgetGuruApp")
        .controller("FollowingController", FollowingController);

    function FollowingController($stateParams, UserService) {
        var vm = this;

        function init() {
            vm.paramUserId = $stateParams.userId;

            UserService.getCurrentUser()
                .then(function (response) {
                        vm.currUser = response.data;
                        return UserService.findFollowingUsers(vm.paramUserId);
                    },
                    function () {
                        console.log("FollowingController->getCurrentUser");
                    })
                .then(function(response) {
                        var following = response.data;
                        following.forEach(function(element, index) {
                            element.isFollowing = element.follower.indexOf(vm.currUser._id) > -1;
                        });
                        vm.following = following;
                        console.log(vm.following);
                    },
                    function(err) {
                        console.log("FollowerController->init->findFollowingUsers")
                    });

            vm.follow = follow;
            vm.unfollow = unfollow;

        }

        init();

        function follow(toFollowUser) {
            UserService.follow(vm.currUser._id, toFollowUser._id)
                .then(function (response) {
                        response = response.data;
                        if (response && response.ok && response.ok === 1 && response.nModified && response.nModified === 1) {
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
                        if (response && response.ok && response.ok === 1 && response.nModified && response.nModified === 1) {
                            toUnfollowUser.isFollowing = false;
                        }
                    },
                    function (err) {
                        console.log(err);
                    });
        }
    }

})();
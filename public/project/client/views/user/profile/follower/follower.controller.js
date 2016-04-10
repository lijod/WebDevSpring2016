(function() {

    angular
        .module("GadgetGuruApp")
        .controller("FollowerController", FollowerController);

    function FollowerController($stateParams, UserService) {
        var vm = this;

        function init() {
            vm.paramUserId = $stateParams.userId;

            UserService.getCurrentUser()
                .then(function (response) {
                        vm.currUser = response.data;
                        return UserService.findFollowerUsers(vm.paramUserId);
                    },
                    function () {
                        console.log("FollowerController->getCurrentUser");
                    })
                .then(function(response) {
                        var followers = response.data;
                        followers.forEach(function(element, index) {
                            element.isFollowing = element.follower.indexOf(vm.currUser._id) > -1;
                        });
                        vm.follower = followers;
                        console.log(vm.follower);
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
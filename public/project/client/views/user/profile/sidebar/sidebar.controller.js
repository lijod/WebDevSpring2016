(function () {

    angular
        .module("GadgetGuruApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope, $state, UserService) {
        var vm = this;
        function init() {
            vm.state = $state;
            vm.isFollowed = false;
            vm.follow = follow;
            vm.unfollow = unfollow;
        }
        init();

        function follow() {
            UserService.follow($scope.profileModel.loggedInUser._id,
                $scope.profileModel.paramUser._id)
                .then(function (response) {
                        console.log(response);
                    },
                    function (err) {
                        console.log(err);
                    });
        }

        function unfollow() {
            UserService.unfollow($scope.profileModel.loggedInUser._id,
                $scope.profileModel.paramUser._id)
                .then(function (response) {
                        console.log(response);
                    },
                    function (err) {
                        console.log(err);
                    });
        }

    }
})();
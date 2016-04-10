(function() {

    angular
        .module("GadgetGuruApp")
        .controller("FollowingController", FollowingController);

    function FollowingController($stateParams, UserService) {
        var vm = this;

        function init() {
            var userId = $stateParams.userId;

            UserService.findFollowingUsers(userId)
                .then(function(response) {
                    vm.following = response.data;
                },
                function(err) {
                    console.log("FollowingController->init->findFollowingUsers")
                });
        }

        init();
    }

})();
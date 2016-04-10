(function() {

    angular
        .module("GadgetGuruApp")
        .controller("FollowerController", FollowerController);

    function FollowerController($stateParams, UserService) {
        var vm = this;

        function init() {
            var userId = $stateParams.userId;

            UserService.findFollowerUsers(userId)
                .then(function(response) {
                        vm.following = response.data;
                    },
                    function(err) {
                        console.log("FollowerController->init->findFollowingUsers")
                    });
        }

        init();
    }

})();
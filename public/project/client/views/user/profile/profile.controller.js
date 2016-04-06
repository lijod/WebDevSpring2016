(function() {

    angular
        .module("GadgetGuruApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $stateParams, UserService) {
        var vm = this;
        function init() {
            var userId = $stateParams.userId;
            UserService.findUserByUserId(userId)
                .then(function (response) {
                        vm.paramUser = response.data;
                    },
                    function (err) {
                        console.log("ProfileController->findUserByUserId");
                        console.log(err);
                    });

            UserService.getCurrentUser()
                .then(function (response) {
                        vm.loggedInUser = response.data;
                    },
                    function (err) {
                        console.log("ProfileController->getCurrentUser");
                        console.log(err);
                    });
        }

        init();

    }
})();
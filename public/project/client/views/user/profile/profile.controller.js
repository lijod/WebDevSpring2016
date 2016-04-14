(function () {

    angular
        .module("GadgetGuruApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $stateParams, $q, UserService) {
        var vm = this;

        function init() {
            var userId = $stateParams.userId;
            UserService.findUserByUserId(userId)
                .then(function(response) {
                    if(response.data) {
                        vm.profileUser = response.data;
                    }
                },
                function(err) {
                    console.log(err);
                });

        }

        init();

    }
})();